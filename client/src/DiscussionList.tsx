import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { discussion } from "./res/interfaces";

const DiscussionList = (props: {discussions: Array<discussion>}) => {
  const { discussions } = props;


  return (
    <div className="discussion-list">
      {discussions.map((discussion) => {
        return (
          <div className="discussion" key={discussion.id}>
            <Link to={`/category/discussion/${discussion.id}`}>
              <Card>
                <Card.Body>
                  <Card.Title>{discussion.name}</Card.Title>
                  <Card.Text>Some quick example text!</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DiscussionList;
