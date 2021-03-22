import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteDiscussion, getChatroomRef } from "../res/BackendConnection";
import firebase from 'firebase/app';
import { message } from "../res/interfaces";
import NotFound from "./NotFound";

const DiscussionView = (props: {username: string}) => {
  useEffect(() => {
    if(props.username === ""){
      alert("Please set a username in the top right.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

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
      querySnapshot.forEach((message) => newMessageList.push({content: message.get("content"), author: message.get("author")}));
      setMessageList(newMessageList);
    });
  }, [chatroomRef]);

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(messageText === ""){
      return;
    }
    if(props.username === ""){
      alert("Please set a username in the top right.");
      return;
    }
    chatroomRef.collection("Messages").add({ content: messageText, time: firebase.firestore.Timestamp.now(), author: props.username });
    setMessageText("");
  };

  if(!validDiscussion){
    return(
      <NotFound />
    );
  }

  return (
    <div className="discussion-view">
      <button onClick={handleDelete}>Delete Discussion</button>
      {messageList?.map((message, i) => {
        return (
          <div key={i}>
            <p>{`${message.author}: ${message.content}`}</p>
          </div>
        );
      })}
      <form>
        <input 
          type="text"
          value={messageText}
          placeholder="Send a message..."
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default DiscussionView;
