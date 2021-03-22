import React, { useState } from "react";
import { addCategory } from "./res/BackendConnection";
import { useHistory } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { Tag } from "react-tag-autocomplete";


const AddCategoryForm = () => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState(Array<Tag>());

  const history = useHistory();

  const suggestions = [
    { id: 3, name: "Bananas" },
    { id: 4, name: "Mangos" },
    { id: 5, name: "Lemons" },
    { id: 6, name: "Apricots" }
  ];

  const handleAddCategory = () => {
    if(name === ""){
      setAddingCategory(false);
      setTags([]);
      return;
    }
    addCategory(name, tags.map(ele => ele.name)).then((result) => {
      if(result.success){
        setAddingCategory(false);
        history.push(`/category/${result.details.id}`);
        return;
      }

    });
  };

  const addTag = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const rmTag = (index: number) => {
    setTags(tags.filter((element: Tag, i: number) => i !== index));
  };

  if(addingCategory){
    return (
      <div className="new-category-form">
        <form>
          <label>Category name: </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ReactTags 
            tags={tags}
            suggestions={suggestions}
            onDelete={rmTag}
            onAddition={addTag}
            allowNew={true} />
        </form>
        <button onClick={handleAddCategory}>Add Category</button>
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

export default AddCategoryForm;
