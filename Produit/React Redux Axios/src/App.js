import React from 'react';
import Home from './component/Home';
import Form from './component/form';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {

  return (
    <div>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
