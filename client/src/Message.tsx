import { useState, useEffect } from "react";
import { message } from "./res/interfaces";
import { getUsernamesCache } from "./res/UsernameCache";

const Message = (props: {message: message, showModOptions: boolean}) => {

  const [message, setMessage] = useState({ ...props.message });

  const { showModOptions } = props;

  useEffect(() => {
    if(!isNaN(Number(message.author))){
      
      getUsernamesCache([Number(message.author)]).then((usernames) => {
        let newMessage = {...message};
        newMessage.author = usernames[Number(message.author)];
        setMessage(newMessage);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pad = (num: number, size: number) => {
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

  const banUser = () => {

  };

  const deleteMessage = () => {

  };

  return (
    <div className= "msgClass">
      <p>
        <span className="msg-text">
          {`${message.author}: ${message.content}`}
        </span>
        {
          showModOptions ?
          <span className="message-mod-options">
            <span className="ban-user">
              <button
                onClick={banUser}
              >
                {/* replace this with a crossed circle NO symbol */}
                Ban this user.
              </button>
            </span>
            <span className="delete-message">
              <button
                onClick={deleteMessage}
              >
                {/* replace this with a trash can symbol */}
                Delete this Message.
              </button>
            </span>
          </span>: 
          <></>
        }
        <span className="msg-time">
          {formatDate(message.time)}
        </span>
      </p>
  </div>
  );
};

export default Message;