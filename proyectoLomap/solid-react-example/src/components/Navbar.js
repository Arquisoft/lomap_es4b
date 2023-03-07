import { useState, useEffect } from "react";
import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";
import App from "../App"
import logo from '../images/lomapLogo.png';


export default function Navbar({logggin}){
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
  
    return (
        <nav className="nav">
          <a href="/home">
            <img src={logo} alt="Logo de Lomap"/>
          </a>
          <FormGroup>

          {({logggin}) ? 
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
          : 
          <LogoutButton >
            <Button style={{ marginTop: 20 }} variant="contained" color="primary">
              Logout
            </Button>
          </LogoutButton>
          }

          </FormGroup>
        </nav>
        
      )
}
