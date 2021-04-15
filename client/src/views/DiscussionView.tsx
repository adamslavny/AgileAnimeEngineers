import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteDiscussion, getChatroomRef } from "../res/BackendConnection";
import firebase from 'firebase/app';
import { message, userData } from "../res/interfaces";
import NotFound from "./NotFound";

const DiscussionView = (props: {userData: userData}) => {

  const { userData } = props;

  const { categoryID, discussionID } = useParams() as {categoryID: string, discussionID: string};
  
  const history = useHistory();
  
  const [messageList, setMessageList] = useState<Array<message>>();
  const [messageText, setMessageText] = useState("");
  const [chatroomRef] = useState(getChatroomRef(categoryID, discussionID));
  const [validDiscussion, setValidDiscussion] = useState(true);

  const handleDelete = () => {
    deleteDiscussion(categoryID, discussionID).then(() => {
      history.push(`/category/${categoryID}`);
    });
  }
  
  useEffect(() => {
    chatroomRef.get().then((chatroomSnapshot) => {
      setValidDiscussion(chatroomSnapshot.exists);
    });

    chatroomRef.collection("Messages").orderBy("time", "asc").onSnapshot((querySnapshot) => {
      let newMessageList: Array<message> = [];
      querySnapshot.forEach((message) => newMessageList.push({content: message.get("content"), author: message.get("author"), time: message.get("time").toDate()}));
      setMessageList(newMessageList);
    });
  }, [chatroomRef]);

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(messageText === ""){
      return;
    }
    if(userData.username === ""){
      alert("Please set a username in your settings before sending a message.");
      return;
    }
    chatroomRef.collection("Messages").add({ content: messageText, time: firebase.firestore.Timestamp.now(), author: userData.username });
    setMessageText("");
  };

  const pad =(num: number, size: number) => {
    let str = num.toString();
    while (str.length < size) str = "0" + num;
    return str;
}

  const formatDate = (date: Date) => {
    const now = Date.now();
    if(now - date.getTime() < 86400000){
      return `${date.getHours()}:${pad(date.getMinutes(), 2)}`;
    }
    return `${date.getMonth()}/${pad(date.getDate(), 2)}/${date.getFullYear()}`;
  }

  if(!validDiscussion){
    return(
      <NotFound />
    );
  }

  return (
    <div className="discussion-view">
      {
        userData.isModerator ?
        <button onClick={handleDelete}>Delete Discussion</button> :
        <></>
      }
      
      {messageList?.map((message, i) => {
        return (
          <div className= "msgClass" key={i}>
            <p>
              <span className="msg-text">
                {`${message.author}: ${message.content}`}
              </span>
              <span className="msg-time">
                {formatDate(message.time)}
              </span>
            </p>
          </div>
        );
      })}
      <form>
        <input className="send-msg-form"
          type="text"
          value={messageText}
          placeholder="Send a message..."
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default DiscussionView;
