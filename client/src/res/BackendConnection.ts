import { functions } from './firebase';

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

export const addCategory = (categoryName: string) => {
  console.log(`calling addCategory(${categoryName})`);
  const addCategoryCall = functions.httpsCallable("addCategory");
  return addCategoryCall({ name: categoryName }).then((result) => {return result.data});
};

