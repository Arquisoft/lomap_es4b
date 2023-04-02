import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import MapView from '../map/MapView'
import SideBar from '../sidebar/SideBar';
import Home from '../home/pages/Home';

import "./LoginForm.css"

const LoginForm = () => {
  return (
  
    <Container maxWidth={false} disableGutters={true} id="loginContainer" >
      <div className="loginForm">
        <Home></Home>
      </div>
    </Container>
  );
}


export default LoginForm;