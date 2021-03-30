import { useEffect, useState } from "react";
import AddCategoryForm from "../AddCategoryForm";
import { getCategories } from "../res/BackendConnection";
import CategoryList from "../CategoryList";
import { category } from "../res/interfaces";
import FilterTags from "../FilterTags";

const HomeView = () => {
  const [categories, setCategories] = useState<Array<category>>();
  const [filterTags, setFilterTags] = useState(Array<string>());

  useEffect(() => {
    const categoriesProm = getCategories();
    categoriesProm.then((result) => {
      setCategories(result);
    });
  }, []);

  if(categories === undefined){
    return (
      <p>Loading...</p>
    );
  }

  const filterCategories = () => {
    if(filterTags.length === 0){
      return categories;
    }
    return categories.filter((ele) => {
      return filterTags.every((ele2) => {
        return ele.tags.includes(ele2);
      });
    });
  };

  return (
    <div className="home-view">
      <AddCategoryForm />
      <FilterTags updateFilterTags={setFilterTags} />
      <CategoryList categories={filterCategories()}/>
    </div>
  );
};

export default HomeView;