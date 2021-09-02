import { GET_MESSAGE, NEW_MESSAGE } from "../action/Actiontype";
export default function MessageReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGE:
      return state;
    case NEW_MESSAGE:
      const { from, message, sender } = payload;
      state[from] = state[from]
        ? [...state[from], { message: message, sender: sender }]
        : [{ message: message, sender: sender }];
      return state;
    default:
      return state;
  }
}
