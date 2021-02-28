import React from 'react';
import './App.css';
import AuthForm from "./components/AuthForm";
import MainScreen from "./components/MainScreen";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
function App() {

    const history = useHistory();
    const token = window.sessionStorage.getItem('token');
  return (
      <Router>
        <div className="App">
            <Route path="/">
                <Redirect to={token ? '/main' : "/login"} />
            </Route>
            <Route path={'/login'} component={() => <AuthForm register={false}/>}/>
            <Route path={'/register'} component={() => <AuthForm register={true}/>}/>
            <Route path={'/main'} component={MainScreen}/>
        </div>
      </Router>
  );
}

export default App;
