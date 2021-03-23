import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactTags, { Tag } from "react-tag-autocomplete";
import { addDiscussion } from "./res/BackendConnection";
import { getTags } from "./res/BackendConnection";

const AddDiscussionForm = (props: {categoryID: string, defaultTags: Array<string>}) => {
  const { categoryID, defaultTags } = props;

  const [addingDiscussion, setAddingDiscussion] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState(defaultTags.map((ele: string, i: number) => {return {id: i, name: ele} as Tag}));
  const [suggestions, setSuggestions] = useState(Array<Tag>());

  const history = useHistory();

  useEffect(() => {
    getTags().then((result) => {
      setSuggestions(result.map((ele: string, i: number) => {return { id: i, name: ele }}));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCategory = () => {
    if(name === ""){
      setAddingDiscussion(false);
      return;
    }
    addDiscussion(name, categoryID, tags.map(ele => ele.name)).then((result) => {
      if(result.success){
        setAddingDiscussion(false);
        history.push(`/discussion/${categoryID}/${result.details.id}`);
        return;
      }

    });
  };

  const addTag = (tag: Tag) => {
    if(tags.find(ele => ele.name === tag.name) === undefined){
      setTags([...tags, tag]);
    }
  };

  const rmTag = (index: number) => {
    setTags(tags.filter((element: Tag, i: number) => i !== index));
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
          <div className="centered-tags">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              onDelete={rmTag}
              onAddition={addTag}
              allowNew={true} />
          </div>
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
