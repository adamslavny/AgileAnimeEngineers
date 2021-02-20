import { useEffect, useState } from "react";
import AddCategoryForm from "../AddCategoryForm";
import { getCategories } from "../res/BackendConnection";
import CategoryList from "../CategoryList";
import { category } from "../res/interfaces";

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

  return (
    <div className="home-view">
      <AddCategoryForm />
      {renderCategories()}
    </div>
  );
};

export default HomeView;