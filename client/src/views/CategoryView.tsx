import { useParams, useHistory } from "react-router-dom";
import DiscussionList from "./../DiscussionList";
import { useEffect, useState } from "react";
import { getDiscussions, deleteCategory } from "../res/BackendConnection";
import NotFound from "./NotFound";
import { discussion } from "./../res/interfaces";
import AddDiscussionForm from "../AddDiscussionForm";

const CategoryView = () => {
  const { id } = useParams() as {id: string};
  const [discussions, setDiscussions] = useState<Array<discussion>>();
  const [categoryName, setCategoryName] = useState("");
  const [validCategory, setValidCategory] = useState(true);
  const [tags, setTags] = useState(Array<string>());

  const history = useHistory();

  useEffect(() => {
    getDiscussions(id).then((discussionsData) => {
      setValidCategory(JSON.stringify(discussionsData) !== "{}");
      if(validCategory){
        setCategoryName(discussionsData.name);
        setTags(discussionsData.categoryTags);
        setDiscussions(discussionsData.discussions);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if(!validCategory){
    return (
      <NotFound />
    );
  }

  if(discussions === undefined){
    return (
      <p>Loading...</p>
    );
  }

  const handleDelete = () => {
    deleteCategory(id).then(() => {
      history.push("/");
    });
  }

  return (
    <div className="category-view">
      <div>
        <h4>{categoryName}</h4>
      </div>
      <button onClick={handleDelete}>Delete Category</button>
      <AddDiscussionForm categoryID={id} defaultTags={tags}/>
      <DiscussionList discussions={discussions} id={id}/>
    </div>
  );
};

export default CategoryView;
