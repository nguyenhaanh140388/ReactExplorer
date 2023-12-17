import { combineReducers } from "redux";
import apiReducer from "./apiReducer";

const reducers = combineReducers({
    apiReducer,
});

export default reducers;