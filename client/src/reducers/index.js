import { combineReducers } from "redux";

import authReducer from "./authReducer";
import basketReducer from "./basketReducer";
import dataReducer from "./dataReducer";
import editReducer from "./editReducer";

const allReducers = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  api: dataReducer,
  edit: editReducer,
});

export default allReducers;
