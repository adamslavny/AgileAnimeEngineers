import { useEffect, useState } from "react";
import { getCategories } from "./BackendConnection";
import CategoryList from "./CategoryList";
import { category } from "./res/interfaces";

const HomeView = () => {
  const [categories, setCategories] = useState<Array<category>>();

  useEffect(() => {
    const categoriesProm = getCategories();
    categoriesProm.then((result) => {
      setCategories(result);
    });
  }, []);

  const renderCategories = () => {
    if(categories === undefined){
      return (
        <p>Loading...</p>
      );
    }
    return(
      <CategoryList categories={categories}/>
    );
  };

  const [addingCategory, setAddingCategory] = useState(false);
  const renderAddCategory = () => {
    if(addingCategory){
      return (
        <div className="new-category-form">
          <form>
            <label>Category name: </label>
            <input type="text" required />
          </form>
          <button>Add Category</button>
        </div>
      );
    }
    return (
      <div className="new-category-button">
        <button onClick={() => setAddingCategory(true)}>
          Add Category
        </button>
      </div>
    );
  };

  return (
    <div className="home-view">
      {renderAddCategory()}
      {renderCategories()}
    </div>
  );
};

export default HomeView;