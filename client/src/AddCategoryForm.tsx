import { useState } from "react";

const AddCategoryForm = () => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [name, setName] = useState("");

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

export default AddCategoryForm;
