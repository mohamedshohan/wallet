import customerReducer from "./customer-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  customer: customerReducer,
 
});

export default rootReducer;