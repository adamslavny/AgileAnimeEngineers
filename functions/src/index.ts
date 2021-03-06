import * as functions from "firebase-functions";
import * as types from "@google-cloud/firestore";
import * as admin from "firebase-admin";
const cors = require('cors')({origin: true});

const log = (name: string, something: any) => {functions.logger.info({name: name, object: something}, {structuredData: true});};

admin.initializeApp();
const db = admin.firestore()

export const getCategories = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const categoriesSnapshot = await db.collection("Categories").get();
  const categoryData = categoriesSnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id, tags: doc.data().tags}});
  response.send({data: categoryData});
}));

interface getDiscussionsRequest {
  category: string;
};

export const getDiscussions = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { category } = request.body.data as getDiscussionsRequest;

  const categoryRef = db.doc(`Categories/${category}`);
  const categorySnapshot = await categoryRef.get();
  const categoryData = categorySnapshot.data();
  if(categoryData === undefined){
    response.send({data: {}});
    return;
  }
  const discussionsSnapshot = await categoryRef.collection("Discussions").get();

  const discussionData = discussionsSnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id, tags: doc.data().tags}});
  response.send({data: { name: categoryData.name, categoryTags: categoryData.tags, discussions: discussionData}});
}));

const checkIfUserIsMod = async (UID: string) => {
  const user = db.doc(`Users/${UID}`);
  const userSnapshot = await user.get();
  return !!userSnapshot.data()?.isModerator;
}

const checkIfUserIsBanned = async (UID: string) => {
  const user = db.doc(`Users/${UID}`);
  const userSnapshot = await user.get();
  return !!userSnapshot.data()?.isBanned;
}

const addTags = async (tags: Array<string>) => {
  const tagsRef = db.doc("Globals/Tags");
  const oldTags = (await tagsRef.get()).get("tags");
  tagsRef.update({tags: [...new Set(oldTags.concat(tags))]});
};

interface addCategoryRequest {
  callerUID: string;
  name: string;
  tags: Array<string>;
};

export const addCategory = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, name, tags } = request.body.data as addCategoryRequest;

  if(await checkIfUserIsBanned(callerUID)){
    response.send({data: {success: false, details: {errorMessage: "You are banned."}}});
    return;
  }

  const categories = db.collection("Categories");
  const sameNameCategories = await categories.where("name", "==", name).get();
  if(sameNameCategories.size > 0){
    response.send({data: {success: false, details: {errorMessage: `There is already a category named ${name}.`}}});
    return;
  }

  addTags(tags);
  const newID = (await categories.add({name: name, tags: tags})).id;
  response.send({data: {success: true, details: {id: newID}}});
}));

interface addDiscussionRequest {
  callerUID: string;
  name: string;
  categoryID: string;
  tags: Array<string>;
};

export const addDiscussion = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, name, categoryID, tags } = request.body.data as addDiscussionRequest;

  if(await checkIfUserIsBanned(callerUID)){
    response.send({data: {success: false, details: {errorMessage: "You are banned."}}});
    return;
  }

  const category = db.doc(`Categories/${categoryID}`);
  if(!(await category.get()).exists){
    response.send({data: {success: false, details: {errorMessage: `There is no category with id ${categoryID}.`}}});
    return;
  }

  const categoryDiscussions = category.collection("Discussions");
  const sameNameDiscussions = await categoryDiscussions.where("name", "==", name).get();
  if(sameNameDiscussions.size > 0){
    response.send({data: {success: false, details: {errorMessage: `There is already a discussion in this category named ${name}.`}}});
    return;
  }
  
  addTags(tags);
  const newID = (await categoryDiscussions.add({name: name, tags: tags})).id;
  response.send({data: {success: true, details: {id: newID}}});
}));

const trimTags = async () => {

  let allTags = new Set<string>();
  let promsToAwait = Array<Promise<any>>();
  const categories = db.collection("Categories");
  for(let category of await categories.listDocuments()){
    const categoryTagsProm = category.get();
    promsToAwait.push(categoryTagsProm.then((categorySnapshot) => {
      const categoryTags = categorySnapshot.get("tags") as Array<string>;
      if(categoryTags){
        allTags = new Set([...allTags, ...categoryTags]);
      }
    }));
    const discussions = category.collection("Discussions");
    for(let discussion of await discussions.listDocuments()){
      const discussionTagsProm = discussion.get();
      promsToAwait.push(discussionTagsProm.then((discussionSnapshot) => {
        const theseTags = discussionSnapshot.get("tags") as Array<string>;
        if(theseTags){
          allTags = new Set([...allTags, ...theseTags]);
        }
      }));
    }
  }
  await Promise.all(promsToAwait);
  db.doc("Globals/Tags").update({tags: [...allTags]});
  log("tags", allTags);
};

const recursiveDeleteCollection = async (collection: types.CollectionReference) => {
  const documents = await collection.listDocuments();
  documents.forEach((documentRef) => {
    recursiveDeleteDocument(documentRef);
  });
};

const recursiveDeleteDocument = async (document: types.DocumentReference) => {
  const childCollections = await document.listCollections();
  let promiseArray = new Array<Promise<void>>();
  childCollections.forEach((collectionRef => {
    promiseArray.push(recursiveDeleteCollection(collectionRef));
  }));
  await Promise.all(promiseArray);
  document.delete();
};

interface deleteCategoryRequest{
  callerUID: string;
  categoryID: string;
};

export const deleteCategory = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, categoryID } = request.body.data as deleteCategoryRequest;

  if(await checkIfUserIsMod(callerUID)){
    await recursiveDeleteDocument(db.doc(`Categories/${categoryID}`));
    trimTags();
  }
  response.send({data: {}});
}));

interface deleteDiscussionRequest {
  callerUID: string;
  discussionID: string;
  categoryID: string;
};

export const deleteDiscussion = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, discussionID, categoryID } = request.body.data as deleteDiscussionRequest;

  if(!(await checkIfUserIsMod(callerUID))){
    response.send({data: {success:false, details: {errorMessage: "You are not a mod."}}});
    return;
  }

  const category = db.doc(`Categories/${categoryID}`);
  if(!(await category.get()).exists){
    response.send({data: {success: false, details: {errorMessage: `There is no category with id ${categoryID}.`}}});
    return;
  }

  const discussion = category.collection("Discussions").doc(`${discussionID}`);
  await recursiveDeleteDocument(discussion);
  trimTags();
  response.send({data: {success: true}});
}));

export const getTags = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const tagsDoc = db.doc("Globals/Tags");
  const tags = (await tagsDoc.get()).get("tags");
  response.send({data: tags});
}));

interface getUserRequest {
  UID: string;
}

export const getUser = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { UID } = request.body.data as getUserRequest;

  const userDoc = db.doc(`Users/${UID}`);
  let userSnapshot = await userDoc.get();

  const isNewUser = !userSnapshot.exists;
  if(isNewUser){
    await userDoc.create({PUID: Date.now(), username: "", isModerator: false, isBanned: false});
    userSnapshot = await userDoc.get();
  }

  const userData = userSnapshot.data();

  response.send({data: {
    isNewUser: isNewUser,
    userData: {
      PUID: userData!.PUID,
      username: userData!.username,
      isModerator: userData!.isModerator,
      isBanned: userData!.isBanned
    }
  }});
}));

interface userData {
  PUID: number;
  username: string;
  isModerator: boolean;
  isBanned: boolean;
}

interface updateUserDataRequest {
  UID: string;
  newUserData: userData;
}

export const updateUserData = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { UID, newUserData } = request.body.data as updateUserDataRequest;

  const userDoc = db.doc(`Users/${UID}`);
  let userSnapshot = await userDoc.get();

  const isNewUser = !userSnapshot.exists;
  if(isNewUser){
    response.send({data:{
      success: false,
      message: "user does not exist"
    }});
    return;
  }

  userDoc.update(newUserData);
  response.send({data: {
    success: true,
    message: ""
  }});
}));

interface getUsernamesRequest {
  PUIDs: Array<number>;
}

export const getUsernames = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { PUIDs } = request.body.data as getUsernamesRequest;

  let usernames: { [PUID: number]: string } = {};
  const users = db.collection("Users");

  Promise.all(PUIDs.map(async (PUID) => {
    usernames[PUID] = (await users.where("PUID", "==", PUID).get()).docs[0].data().username;
  })).then(() => {
    response.send({ data: { 
      usernameMap: usernames
    }});
  });

}));

export const getMods = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const users = db.collection("Users");

  const mods = await users.where("isModerator", "==", true).get();
  let modIDs: number[] = [];
  mods.forEach((mod) => {
    modIDs.push(mod.data().PUID);
  });
  response.send({data: modIDs});
}));

interface assignModRequest {
  callerUID: string;
  newModPUID: number;
}

export const assignMod = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, newModPUID } = request.body.data as assignModRequest;

  if(await checkIfUserIsMod(callerUID)){
    const user = db.collection("Users").where("PUID", "==", newModPUID);
    const userSnapshot = (await user.get()).docs[0];
    if(userSnapshot.exists){
      userSnapshot.ref.update({ isModerator: true });
    }
  }

  response.send({data: {}});
}));

interface banUserRequest {
  callerUID: string;
  bannedPUID: number;
}

export const banUser = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { callerUID, bannedPUID } = request.body.data as banUserRequest;

  if(await checkIfUserIsMod(callerUID)){
    const user = db.collection("Users").where("PUID", "==", bannedPUID);
    const userSnapshot = (await user.get()).docs[0];
    if(userSnapshot.exists){
      userSnapshot.ref.update({ isBanned: true, isModerator: false });
    }
  }

  response.send({data: {}});
}));
