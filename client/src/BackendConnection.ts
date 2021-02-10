import { functions } from './res/firebase';

/*
Note:
Each of these functions returns a promise which will eventually return the resulting data.
Either await the functions or use .then() to access the returned data.
*/

const getCategories = () => {
  const getCategoriesCall = functions.httpsCallable("getCategories");
  return getCategoriesCall().then((result) => {return result.data});
};

const getDiscussions = (categoryName: string) => {
  const getDiscussionsCall = functions.httpsCallable("getDiscussions");
  return getDiscussionsCall({ category: categoryName }).then((result) => {return result.data});
};

export { getCategories, getDiscussions };
