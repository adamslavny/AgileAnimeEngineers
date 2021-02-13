import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { category } from "./res/interfaces";

const CategoryList = (props: {categories: Array<category>}) => {
  const { categories } = props;

  return (
    <div className="category-list">
      {(categories && categories.map((category) => {
        return (
          <div className="category" key={category.id}>
            <Link to={`/category/${category.id}`}>
              <Card>
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>Some quick example text!</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })) || (<p>Loading...</p>)}
    </div>
  );
};

export default CategoryList;