
const AddCategoryForm = () => {
  return (
    <div className="new-category-form">
      <form>
        <label>Category name: </label>
        <input
          type="text"
          required
        />
      </form>
      <button>Add Category</button>
    </div>
  )
};

export default AddCategoryForm;
