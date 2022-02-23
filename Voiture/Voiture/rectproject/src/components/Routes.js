import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Commentaire from '../pages/Commentaire';
const Routes = (props) => {
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
            history.push('/admin')
        }
    }, [])
    useEffect(() => {
        if (!localStorage.getItem('token') && location.pathname != "/register" && location.pathname != "/") {
            history.push('/login')

        }
    }, [location.pathname])
    console.log(location.pathname);
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home user={props.user}/>
                </Route>
                <Route exact path="/commentaire" component={Commentaire} />
                <Route exact path="/admin">
                    <Admin user={props.user} />
                </Route>
                <Route exact path="/login">
                    <Login setUser={props.setUser} />
                </Route>
                <Route exact path="/register" component={Register} />
            </Switch>
        </div>
    )
}
export default Routes;