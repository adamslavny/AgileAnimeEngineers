import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteDiscussion, getChatroomMessages } from "../res/BackendConnection";
import firebase from 'firebase/app';
import { message } from "../res/interfaces";

const DiscussionView = (props: {username: string}) => {
  const { categoryID, discussionID } = useParams() as {categoryID: string, discussionID: string};
  
  const history = useHistory();
  
  const [messageList, setMessageList] = useState<Array<message>>();
  const [message, setMessage] = useState<message>({ content: "", author: props.username});
  const [chatroomRef] = useState(getChatroomMessages(categoryID, discussionID));

  const handleDelete = () => {
    deleteDiscussion(categoryID, discussionID).then(() => {
      history.push(`/category/${categoryID}`);
    });
  }
  
  useEffect(() => {
    chatroomRef.orderBy("time", "asc").onSnapshot((querySnapshot) => {
      let newMessageList: Array<message> = [];
      querySnapshot.forEach((message) => newMessageList.push({content: message.get("content"), author: message.get("author")}));
      setMessageList(newMessageList);
    });

  }, [chatroomRef]);

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(message?.content === ""){
      return;
    }
    chatroomRef.add({ content: message.content, time: firebase.firestore.Timestamp.now(), author: message.author });
    setMessage({ content: "", author: props.username});
  };

  return (
    <div className="discussion-view">
      <button onClick={handleDelete}>Delete Discussion</button>
      {messageList?.map((message, i) => {
        return (
          <div className= "msgClass" key={i}>
            <p className= "msg-text">{`${message.author}: ${message.content}`}</p>
          </div>
        );
      })}
      <form>
        <input className="send-msg-form"
          type="text"
          value={message.content}
          placeholder="Send a message..."
          onChange={(e) => setMessage({ content: e.target.value, author: props.username})}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default DiscussionView;
