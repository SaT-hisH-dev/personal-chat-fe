import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { io } from "socket.io-client";
import { socket } from "../Common";
import { GET_MESSAGE, NEW_MESSAGE } from "../redux/action/Actiontype";

function Messagebox() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const myprof = useSelector((state) => state.MyidReducer);
  const messageList = useSelector((state) => state.MessageReducer);
  useEffect(() => {
    socket.on("send-message", (data) => {
      dispatch({
        type: NEW_MESSAGE,
        payload: data,
      });
    });
  }, []);
  const messageHandle = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    socket.emit("New-mesage", { to: id, message: message, ...myprof });
    dispatch({
      type: NEW_MESSAGE,
      payload: { from: id, message: message, sender: true },
    });
    setMessage("");
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter" && message.length > 0) {
      sendMessage();
    }
  };
  useEffect(() => {
    dispatch({ type: GET_MESSAGE, payload: id });
  }, [id]);

  return (
    <div className="warper">
      <ListGroup>
        {(messageList[id] || []).map((d) => (
          <ListGroupItem>
            <ListGroupItemHeading
              style={{
                color: d.sender ? "red" : "blue",
                float: d.sender ? "right" : "",
              }}
            >
              {d.message}
            </ListGroupItemHeading>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Input
        type="text"
        placeholder="Enter your message"
        value={message}
        onKeyPress={handleKeypress}
        onChange={messageHandle}
      />
    </div>
  );
}

export default Messagebox;
