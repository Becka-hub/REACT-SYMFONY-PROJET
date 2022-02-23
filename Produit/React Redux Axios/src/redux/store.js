import RootReducer from "./reducer/rootReducer";
import { createStore } from "redux";
import { composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const Store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default Store;