import firebase from "firebase";
import { db, functions } from './firebase';
import { userData } from './interfaces';

/*
Note:
Each of these functions returns a promise which will eventually return the resulting data.
Either await the functions or use .then() to access the returned data.
*/

export const getCategories = () => {
  console.log("calling getCategories()");
  const getCategoriesCall = functions.httpsCallable("getCategories");
  return getCategoriesCall().then((result) => {return result.data});
};

export const getDiscussions = (categoryName: string) => {
  console.log(`calling getDiscussions(${categoryName})`);
  const getDiscussionsCall = functions.httpsCallable("getDiscussions");
  return getDiscussionsCall({ category: categoryName }).then((result) => {return result.data});
};

export const addCategory = (categoryName: string, tags: Array<string>) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling addCategory(${callerUID}, ${categoryName}, ${tags})`);
  const addCategoryCall = functions.httpsCallable("addCategory");
  return addCategoryCall({ callerID: callerUID, name: categoryName, tags: tags }).then((result) => {return result.data});
};

export const addDiscussion = (discussionName: string, categoryID: string, tags: Array<string>) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling addDiscussion(${callerUID}, ${discussionName}, ${categoryID}, ${tags})`);
  const addDiscussionCall = functions.httpsCallable("addDiscussion");
  return addDiscussionCall({ callerUID: callerUID, name: discussionName, categoryID: categoryID, tags: tags }).then((result) => {return result.data});
};

export const deleteCategory = (categoryID: string) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling deleteCategory(${callerUID}, ${categoryID})`);
  const deleteCategoryCall = functions.httpsCallable("deleteCategory");
  return deleteCategoryCall({ callerUID: callerUID, categoryID: categoryID }).then((result) => {return result.data});
};

export const deleteDiscussion = (categoryID: string, discussionID: string) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling deleteDiscussion(${callerUID}, ${categoryID}, ${discussionID})`);
  const deleteDiscussionCall = functions.httpsCallable("deleteDiscussion");
  return deleteDiscussionCall({ callerUID: callerUID, categoryID: categoryID, discussionID: discussionID }).then((result) => {return result.data});
};

export const getChatroomRef = (categoryID: string, discussionID: string) => {
    return db.doc(`Categories/${categoryID}/Discussions/${discussionID}`);
};

export const getTags = () => {
  console.log("calling getTags()");
  const getTagsCall = functions.httpsCallable("getTags");
  return getTagsCall().then((result) => {return result.data});
};

export const getUser = (UID: string) => {
  console.log(`calling getUser(${UID})`);
  const getUserCall = functions.httpsCallable("getUser");
  return getUserCall({ UID: UID }).then((result) => {return result.data});
};

export const updateUserData = (UID: string, newUserData: userData) => {
  console.log(`calling updateUserData(${UID}, {${newUserData.PUID}, ${newUserData.username}})`);
  const updateUserDataCall = functions.httpsCallable("updateUserData");
  return updateUserDataCall({ UID: UID, newUserData: newUserData }).then((result) => {return result.data});
};

export const getUsernames = (PUIDs: Array<number>) => {
  console.log(`calling getUsernames(${PUIDs})`);
  const getUsernamesCall = functions.httpsCallable("getUsernames");
  return getUsernamesCall({ PUIDs: PUIDs }).then((result) => {return result.data});
};

export const getMods = () => {
  console.log(`calling getMods()`);
  const getModsCall = functions.httpsCallable("getMods");
  return getModsCall().then((result) => {return result.data});
};

export const assignMod = (newModPUID: number) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling assignMod(${callerUID}, ${newModPUID})`);
  const assignModCall = functions.httpsCallable("assignMod");
  return assignModCall({ callerUID: callerUID, newModPUID: newModPUID }).then((result) => {return result.data});
};

export const banUser = (bannedPUID: number) => {
  const callerUID = firebase.auth().currentUser!.uid;
  console.log(`calling banUser(${callerUID}, ${bannedPUID})`);
  const banUserCall = functions.httpsCallable("banUser");
  return banUserCall({ callerUID: callerUID, bannedPUID: bannedPUID }).then((result) => {return result.data});
};
