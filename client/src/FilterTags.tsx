import { time } from "console";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
import { useState, useEffect } from "react";
import ReactTags, { Tag } from "react-tag-autocomplete"
import { getTags } from "./res/BackendConnection";

const FilterTags = (props: {updateFilterTags: (newTags: Array<string>) => void}) => {
  const [tags, setTags] = useState(Array<Tag>());
  const [suggestions, setSuggestions] = useState(Array<Tag>());

  const { updateFilterTags } = props;

  useEffect(() => {
    getTags().then((result) => {
      setSuggestions(result.map((ele: string, i: number) => {return { id: i, name: ele }}));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateFilterTags(tags.map(ele => ele.name));
  }, [tags]);

  const addTag = (tag: Tag) => {
    if(tags.find(ele => ele.name === tag.name) === undefined){
      setTags([...tags, tag]);
    }
  };

  const rmTag = (index: number) => {
    setTags(tags.filter((element: Tag, i: number) => i !== index));
  };

  return (
    <div className="filter-tags">
      <ReactTags
      tags={tags}
      suggestions={suggestions}
      onDelete={rmTag}
      onAddition={addTag}
      placeholderText="Filter" />
    </div>
  );
};

export default FilterTags;
