import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteDiscussion, getChatroomMessages } from "../res/BackendConnection";
import firebase from 'firebase/app';

const DiscussionView = () => {
  const { categoryID, discussionID } = useParams() as {categoryID: string, discussionID: string};
  
  const history = useHistory();
  
  const [messageList, setMessageList] = useState<Array<string>>();
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    deleteDiscussion(categoryID, discussionID).then(() => {
      history.push(`/category/${categoryID}`);
    });
  }

  const chatroomRef = getChatroomMessages(categoryID, discussionID);
  chatroomRef.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((message) => {console.log(message.get("content"));})
    let newMessageList: Array<string> = [];
    querySnapshot.forEach((message) => newMessageList.push(message.get("content")));
    setMessageList(newMessageList);
  })

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(message === ""){
      return;
    }
    chatroomRef.add({ content: message, time: firebase.firestore.Timestamp.now() });
    setMessage("");
  };

  return (
    <div className="discussion-view">
      <button onClick={handleDelete}>Delete Discussion</button>
      {messageList?.map((message) => {
        return (
          <p>{message}</p>
        );
      })}
      <form>
        <input 
          type="text"
          value={message}
          placeholder="Send a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default DiscussionView;
