import { useParams } from "react-router-dom";
import DiscussionList from "./../DiscussionList";
import { useEffect, useState } from "react";
import { getDiscussions } from "../res/BackendConnection";
import NotFound from "./NotFound";
import { discussion } from "./../res/interfaces";
import AddDiscussionForm from "../AddDiscussionForm";

const CategoryView = () => {
  const { id } = useParams() as {id: string};
  const [discussions, setDiscussions] = useState<Array<discussion>>();
  const [categoryName, setCategoryName] = useState("");
  const [validCategory, setValidCategory] = useState(true);

  useEffect(() => {
    getDiscussions(id).then((discussionsData) => {
      setValidCategory(JSON.stringify(discussionsData) !== "{}");
      if(validCategory){
        setDiscussions(discussionsData.discussions);
        setCategoryName(discussionsData.name);
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

  return (
    <div className="category-view">
      <div>
        <h4>{categoryName}</h4>
      </div>
      <AddDiscussionForm categoryID={id}/>
      <DiscussionList discussions={discussions} id={id}/>
    </div>
  );
};

export default CategoryView;
