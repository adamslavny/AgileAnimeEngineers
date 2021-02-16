import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { discussion } from "./res/interfaces";

const DiscussionList = (props: {discussions: Array<discussion>, id: string}) => {
  const { discussions, id } = props;


  return (
    <div className="discussion-list">
      {discussions.map((discussion) => {
        return (
          <div className="discussion" key={discussion.id}>
            <Link to={`/discussion/${id}/${discussion.id}`}>
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
