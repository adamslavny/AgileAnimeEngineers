import { useParams } from "react-router-dom";
import DiscussionList from "./DiscussionList";
import { useEffect, useState } from "react";
import { getDiscussions } from "./BackendConnection";
import NotFound from "./NotFound";
import { discussion } from "./res/interfaces";

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
  }, [id]);

  const renderDiscussions = () => {
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
      <DiscussionList discussions={discussions} id={id}/>
    );
  };

  return (
    <div className="category-view">
      <div>
        <h4>{categoryName}</h4>
      </div>
      {renderDiscussions()}
    </div>
  );
};

export default CategoryView;
