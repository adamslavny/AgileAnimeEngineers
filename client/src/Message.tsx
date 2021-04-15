import { useState, useEffect } from "react";
import { message } from "./res/interfaces";
import { getUsernamesCache } from "./res/UsernameCache";

const Message = (props: {message: message}) => {

  const [message, setMessage] = useState({ ...props.message });  

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

  return (
    <div className= "msgClass">
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
};

export default Message;
