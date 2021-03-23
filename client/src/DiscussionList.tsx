import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { discussion } from "./res/interfaces";

const DiscussionList = (props: {discussions: Array<discussion>, id: string}) => {
  const { discussions, id } = props;

  discussions.sort((a, b) => {
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
    <div className="discussion-list">
      {(discussions.length && discussions.map((discussion) => {
        return (
          <div className="discussion" key={discussion.id}>
            <Link to={`/discussion/${id}/${discussion.id}`}>
              <Card className="no-border-plz">
                <Card.Body>
                  <Card.Title>{discussion.name}</Card.Title>
                  <Card.Text>{discussion.tags.join(" ")}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })) || (<p>There's no discussions here yet!</p>)}
    </div>
  );
};

export default DiscussionList;
