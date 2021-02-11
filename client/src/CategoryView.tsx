import { useParams } from "react-router-dom";

const CategoryView = () => {

  const { id } = useParams() as {id: string};
  console.log(id);
  // return (
  //   <div className="category-view">
  //     <p>{categories.find((x) => {return x.id === id})!.name}</p>
  //   </div>
  // )
  return (
    <div className="category-view">
      
    </div>
  );
};

export default CategoryView;
