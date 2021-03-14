import { combineReducers } from "redux";

import authReducer from "./authReducer";
import basketReducer from "./basketReducer";
import dataReducer from "./dataReducer";

const allReducers = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  api: dataReducer,
});

export default allReducers;
