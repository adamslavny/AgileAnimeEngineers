import { useState, useEffect } from "react";
import { banUser as banUserBackend } from "./res/BackendConnection";
import { message } from "./res/interfaces";
import { getUsernamesCache } from "./res/UsernameCache";
import trashcanSmall from './icons/trashcanSmall.png'
import smallNO from './icons/no small.png'

const Message = (props: {message: message, showModOptions: boolean, handleDelete: (messageID: string) => void}) => {

  const [message, setMessage] = useState<message>({ ...props.message });

  const { showModOptions, handleDelete } = props;

  useEffect(() => {
    if(message.author === ""){
      getUsernamesCache([message.authorID]).then((usernames) => {
        let newMessage = {...message};
        newMessage.author = usernames[message.authorID];
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
    banUserBackend(message.authorID);
  };

  return (
    <div className= "msgClass">
      <p className = "msg-adj">
        <span className="msg-text">
          {`${message.author}: ${message.content}`}
      </span>
        <span className = "big-span">
          <span className="msg-time">
            {formatDate(message.time)}
          </span>
          {
            showModOptions ?
            <span className="message-mod-options">
              <span className="ban-user">
              <img src={smallNO} alt="trash can"
                  onClick={banUser}/>
              </span>
              <span>&nbsp;
                <img src={trashcanSmall} alt="Delete"
                  onClick={() => handleDelete(message.ID)}/>
              </span>
            </span>: 
          
            <></>
          }
        </span>
      </p>
  </div>
  );
};

export default Message;
