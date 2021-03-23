import { useState, useEffect } from "react";
import { addCategory } from "./res/BackendConnection";
import { useHistory } from "react-router-dom";
import ReactTags, { Tag } from "react-tag-autocomplete";
import { getTags } from "./res/BackendConnection";


const AddCategoryForm = () => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState(Array<Tag>());
  const [suggestions, setSuggestions] = useState(Array<Tag>());

  const history = useHistory();

  useEffect(() => {
    getTags().then((result) => {
      setSuggestions(result.map((ele: string, i: number) => {return { id: i, name: ele }}));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if(tags.find(ele => ele.name === tag.name) === undefined){
      setTags([...tags, tag]);
    }
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
