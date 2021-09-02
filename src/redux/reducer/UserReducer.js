import { ALL_USER } from "../action/Actiontype";
export default function UserReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_USER:
      return [...payload];
    default:
      return state;
  }
}
