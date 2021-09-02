import { MY_PROFILE } from "../action/Actiontype";
export default function MyidReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case MY_PROFILE:
      return payload;
    default:
      return state;
  }
}
