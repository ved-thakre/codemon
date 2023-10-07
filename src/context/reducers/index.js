import { combineReducers } from "redux"
import userAuthReducer from './userAuthReducer';
import projectReducers from "./projectReducers";
import searchReducers from "./searchReducers";

const myReducer = combineReducers({
  user: userAuthReducer,
  projects: projectReducers,
  searchTerm: searchReducers,
});

export default myReducer;