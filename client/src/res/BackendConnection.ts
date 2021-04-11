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
  console.log(`calling addCategory(${categoryName}, ${tags})`);
  const addCategoryCall = functions.httpsCallable("addCategory");
  return addCategoryCall({ name: categoryName, tags: tags }).then((result) => {return result.data});
};

export const addDiscussion = (discussionName: string, categoryID: string, tags: Array<string>) => {
  console.log(`calling addDiscussion(${discussionName}, ${categoryID}, ${tags})`);
  const addDiscussionCall = functions.httpsCallable("addDiscussion");
  return addDiscussionCall({ name: discussionName, categoryID: categoryID, tags: tags }).then((result) => {return result.data});
};

export const deleteCategory = (categoryID: string) => {
  console.log(`calling deleteCategory(${categoryID})`);
  const deleteCategoryCall = functions.httpsCallable("deleteCategory");
  return deleteCategoryCall({ categoryID: categoryID }).then((result) => {return result.data});
};

export const deleteDiscussion = (categoryID: string, discussionID: string) => {
  console.log(`calling deleteDiscussion(${categoryID}, ${discussionID})`);
  const deleteDiscussionCall = functions.httpsCallable("deleteDiscussion");
  return deleteDiscussionCall({ categoryID: categoryID, discussionID: discussionID }).then((result) => {return result.data});
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
  const addDiscussionCall = functions.httpsCallable("getUser");
  return addDiscussionCall({ UID: UID }).then((result) => {return result.data});
};

export const setUserData = (UID: string, newUserData: userData) => {
  console.log(`calling getUser(${UID}, ${newUserData})`);
  const addDiscussionCall = functions.httpsCallable("setUserData");
  return addDiscussionCall({ UID: UID, newUserData: newUserData }).then((result) => {return result.data});
};
