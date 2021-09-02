import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Slidebar from "./components/Slidebar";
import Messagebox from "./components/Messagebox";
import { useDispatch } from "react-redux";
import { ALL_USER, NEW_MESSAGE, MY_PROFILE } from "./redux/action/Actiontype";
import { Route, Router } from "react-router";
import {
  ModalFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";
import { socket } from "./Common";

function App() {
  const [myId, setmyId] = useState("");
  const [myName, setmyName] = useState("");
  const [modal, setmodal] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("myid", (id) => {
      setmyId(id);
    });
  }, []);

  useEffect(() => {
    socket.on("All-user", (data) => {
      dispatch({
        type: ALL_USER,
        payload: data,
      });
    });

    socket.on("user left", (data) => {
      dispatch({
        type: ALL_USER,
        payload: data,
      });
    });
  }, []);
  const NameHandle = (e) => {
    setmyName(e.target.value);
  };
  const SaveName = () => {
    dispatch({ type: MY_PROFILE, payload: { id: myId, name: myName } });
    socket.emit("new-join", { id: myId, name: myName });
    setmodal(false);
  };
  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Input
            value={myName}
            placeholder="Enter your name"
            onChange={NameHandle}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={SaveName}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Slidebar />
      <Route path="/:id" component={Messagebox} />
    </div>
  );
}

export default App;
