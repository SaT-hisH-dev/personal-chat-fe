import { combineReducers } from "redux";
import MessageReducer from "./MessageReducer";
import UserReducer from "./UserReducer";
import MyidReducer from "./MyidReducer";
const RootReducer = combineReducers({
  MessageReducer,
  UserReducer,
  MyidReducer,
});

export default RootReducer;
