import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { category } from "./res/interfaces";

const CategoryList = (props: {categories: Array<category>}) => {
  const { categories } = props;

  categories.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <div className="category" key={category.id}>
            <Link to={`/category/${category.id}`}>
              <Card className="no-border-plz">
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.tags.join(" ")}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
