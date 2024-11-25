import { combineReducers } from "redux";
import bookReducer from "../redux/reducer";

const rootReducer = combineReducers({
  book: bookReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
