import { useParams, useHistory } from "react-router-dom";
import DiscussionList from "./../DiscussionList";
import { useEffect, useState } from "react";
import { getDiscussions, deleteCategory } from "../res/BackendConnection";
import NotFound from "./NotFound";
import { discussion, userData } from "./../res/interfaces";
import AddDiscussionForm from "../AddDiscussionForm";
import FilterTags from "../FilterTags";

const CategoryView = (props: { userData: userData }) => {
  const { id } = useParams() as {id: string};
  const [discussions, setDiscussions] = useState<Array<discussion>>();
  const [categoryName, setCategoryName] = useState("");
  const [validCategory, setValidCategory] = useState(true);
  const [tags, setTags] = useState(Array<string>());
  const [filterTags, setFilterTags] = useState(Array<string>());

  const history = useHistory();

  const { userData } = props;

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

  useEffect(() => {
    console.log(filterTags);
  }, [filterTags]);

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

  const filterDiscussions = () => {
    if(filterTags.length === 0){
      return discussions;
    }
    return discussions.filter((ele) => {
      return filterTags.every((ele2) => {
        return ele.tags.includes(ele2);
      });
    });
  };

  

  return (
    <div className="category-view">
      <div>
        <h4>{categoryName}</h4>
      </div>
      {
        userData.isModerator ?
        <button onClick={handleDelete}>Delete Category</button> : 
        <></>
      }
      <AddDiscussionForm categoryID={id} defaultTags={tags}/>
      <FilterTags updateFilterTags={setFilterTags} />
      <DiscussionList discussions={filterDiscussions()} id={id}/>
    </div>
  );
};

export default CategoryView;
