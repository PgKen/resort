import React,{useState,useEffect} from "react";
import "./css/style.css";
import Formlogin from "./component/formlogin";
import Menu from "./component/Menu";
import Maincontent from './component/Maincontent'

import { useSelector } from "react-redux";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
const users = useSelector((state) => state.users.userList);


  return (
    <div className="main-container-root">
            {(users[0].active == 1)?(<Formlogin/>):(<Maincontent/>)}
    </div>
  );
}

export default App;
