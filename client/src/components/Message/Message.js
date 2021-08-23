  
import "./Message.css";

export default function Message({Message,own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg " 
        />
        <p className="messageText">{Message.text}</p>
      </div>
      <div className="messageBottom"> {Message.createdAt}</div>
    </div>
  );
}