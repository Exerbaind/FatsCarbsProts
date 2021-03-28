import { combineReducers } from "redux";

import authReducer from "./authReducer";
import basketReducer from "./basketReducer";
import dataReducer from "./dataReducer";
import editReducer from "./editReducer";
import favoriteReducer from "./favoriteReducer";
import formsReducer from "./formsReducer";

const allReducers = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  api: dataReducer,
  edit: editReducer,
  favorite: favoriteReducer,
  forms: formsReducer,
});

export default allReducers;
