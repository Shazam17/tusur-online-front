import React from 'react';
import './App.css';
import AuthForm from "./components/AuthForm";
import MainScreen from "./components/MainScreen";

import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import GroupDetail from "./components/GroupDetail";
import SocketTestPage from "./components/SocketTestPage";
function App() {

  return (
      <Router>
        <div className="App">
            {/*<Route path="/">*/}
            {/*    <Redirect to={curPage ? curPage : "/login"} />*/}
            {/*</Route>*/}
            <Route path={'/login'} component={() => <AuthForm register={false}/>}/>
            <Route path={'/register'} component={() => <AuthForm register={true}/>}/>
            <Route path={'/group-detail'} component={() => <GroupDetail register={true}/>}/>
            <Route path={'/main'} component={MainScreen}/>
            <Route path={'/test'} component={SocketTestPage}/>
        </div>
      </Router>
  );
}

export default App;
