import cartReducer from "./reducer/cartReducer";
import produitReducer from "./reducer/produitReducer";
import authReducer from "./reducer/authReducer";
import { combineReducers } from "redux";
const rootReducers = combineReducers({ produit: produitReducer, cart: cartReducer,user: authReducer});
export default rootReducers;