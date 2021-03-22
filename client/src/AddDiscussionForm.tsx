import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addDiscussion } from "./res/BackendConnection";

const AddDiscussionForm = (props: {categoryID: string}) => {
  const { categoryID } = props;

  const [addingDiscussion, setAddingDiscussion] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();

  const handleAddCategory = () => {
    if(name === ""){
      setAddingDiscussion(false);
      return;
    }
    addDiscussion(name, categoryID, []).then((result) => {
      if(result.success){
        setAddingDiscussion(false);
        history.push(`/discussion/${categoryID}/${result.details.id}`);
        return;
      }

    });
  };

  if(addingDiscussion){
    return (
      <div className="new-discussion-form">
        <form>
          <label>Discussion name: </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <button onClick={handleAddCategory}>Add Discussion</button>
      </div>
    );
  }

  return (
    <div className="new-category-button">
      <button onClick={() => setAddingDiscussion(true)}>
        Add Discussion
      </button>
    </div>
  );
};

export default AddDiscussionForm;
