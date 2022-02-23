import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './redux/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

