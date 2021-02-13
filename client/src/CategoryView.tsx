import { useParams } from "react-router-dom";
import DiscussionList from "./DiscussionList";
import { useEffect, useState } from "react";
import { getDiscussions } from "./BackendConnection";
import NotFound from "./NotFound";

interface discussion{
  name: string;
  id: string;
}

const CategoryView = () => {
  const { id } = useParams() as {id: string};
  const [discussions, setDiscussions] = useState<Array<discussion>>();
  const [validCategory, setValidCategory] = useState(true);

  useEffect(() => {
    getDiscussions(id).then((discussionsData) => {
      setValidCategory(JSON.stringify(discussionsData) !== "{}");
      setDiscussions(discussionsData.discussions);
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
      <DiscussionList discussions={discussions}/>
    );
  };

  return (
    <div className="category-view">
      {renderDiscussions()}
    </div>
  );
};

export default CategoryView;
