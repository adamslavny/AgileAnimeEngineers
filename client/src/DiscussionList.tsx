import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

interface discussion{
  name: string;
  id: string;
}

const DiscussionList = (props: {discussions: Array<discussion>}) => {
  const { discussions } = props;


  return (
    <div className="discussion-list">
      {discussions.map((discussion) => {
        return (
          <Link to={`/category/discussion/${discussion.id}`}>
            <Card>
              <Card.Body>
                <Card.Title>{discussion.name}</Card.Title>
                <Card.Text>Some quick example text!</Card.Text>
              </Card.Body>
            </Card>
          </Link>
      ) ;
      })}
    </div>
  );
};

export default DiscussionList;
