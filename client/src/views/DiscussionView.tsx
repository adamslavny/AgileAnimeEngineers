import { useParams, useHistory } from "react-router-dom";
import { deleteDiscussion } from "../res/BackendConnection";

const DiscussionView = () => {
  const { categoryID, discussionID } = useParams() as {categoryID: string, discussionID: string};

  const history = useHistory();
  
  const handleDelete = () => {
    deleteDiscussion(categoryID, discussionID).then(() => {
      history.push(`/category/${categoryID}`);
    });
  }

  return (
    <div className="discussion-view">
      <button onClick={handleDelete}>Delete Discussion</button>
      <p>Sorry. We don't have discussions implemented yet :3</p>
    </div>
  );
};

export default DiscussionView;
