import React, {useState} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/Routes';
import NavBar from './components/NavBar';
const App = () => {
  const [user,setUser]=useState(null);
  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser}/>
        <Routes user={user} setUser={setUser}/>
      </Router>
    </div>
  );
}
export default App;