import * as functions from "firebase-functions";
import * as types from "@google-cloud/firestore";
import * as admin from "firebase-admin";
const cors = require('cors')({origin: true});

const log = (name: string, something: any) => {functions.logger.info({name: name, object: something}, {structuredData: true});};

admin.initializeApp();
const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => cors(request, response, () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);
  
  response.send({data: "Hello, World!"});
}));

export const getCategories = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const categoriesSnapshot = await db.collection("Categories").get();
  const categoryData = categoriesSnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id}});
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

  const discussionData = discussionsSnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id}});
  response.send({data: { name: categoryData.name, discussions: discussionData}});
}));

interface addCategoryRequest {
  name: string;
  tags: Array<string>;
};

const addTags = async (tags: Array<string>) => {
  const tagsRef = db.doc("Globals/Tags");
  const oldTags = (await tagsRef.get()).get("tags");
  tagsRef.update({tags: [...new Set(oldTags.concat(tags))]});
};

export const addCategory = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { name, tags } = request.body.data as addCategoryRequest;
  
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
  name: string;
  categoryID: string;
  tags: Array<string>;
};

export const addDiscussion = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { name, categoryID, tags } = request.body.data as addDiscussionRequest;

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
  Promise.all(promiseArray).then(() => {
    document.delete();
  });
};

interface deleteCategoryRequest{
  categoryID: string;
};

export const deleteCategory= functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { categoryID } = request.body.data as deleteCategoryRequest;

  await recursiveDeleteDocument(db.doc(`Categories/${categoryID}`));

  response.send({data: {}});
}));

interface deleteDiscussionRequest {
  discussionID: string;
  categoryID: string;
};

export const deleteDiscussion = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const { discussionID, categoryID } = request.body.data as deleteDiscussionRequest;

  const category = db.doc(`Categories/${categoryID}`);
  if(!(await category.get()).exists){
    response.send({data: {success: false, details: {errorMessage: `There is no category with id ${categoryID}.`}}});
    return;
  }

  const discussion = category.collection("Discussions").doc(`${discussionID}`);
  await recursiveDeleteDocument(discussion);
  response.send({data: {success: true}});
}));
