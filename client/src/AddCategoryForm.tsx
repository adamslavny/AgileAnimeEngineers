import { useState } from "react";
import { addCategory } from "./res/BackendConnection";
import { useHistory } from "react-router-dom";

const AddCategoryForm = () => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();

  const handleAddCategory = () => {
    addCategory(name).then((result) => {
      if(result.success){
        setAddingCategory(false);
        history.push(`/category/${result.details.id}`);
        return;
      }

    });
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
