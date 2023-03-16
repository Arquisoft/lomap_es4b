import { useState, useEffect } from "react";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession, Text} from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, CardActionArea, IconButton, MoreVertIcon, Avatar } from "@material-ui/core";
import App from "../App"
import logo from '../images/lomapLogo.png';
import { VCARD, FOAF } from "@inrupt/lit-generated-vocab-common";
import {savePoints} from "../helper/PointsManager";

export default function Navbar({logggin}){
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  const { session } = useSession();
  const { webId } = session.info;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
  
    return (
        <nav className="nav">

          <a href="/home">
            <img src={logo} alt="Logo de Lomap"/>
          </a>

          
          {logggin ? (
            <>
              <div className="profile-preview">
                <CombinedDataProvider datasetUrl={webId} thingUrl={webId} className="image-button" style={{flexDirection: 'row'}}>
                  <Image property={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:80, height:80, borderRadius:40}}/>
                  <Text property={FOAF.name.iri.value} style={{ fontSize: 20 }}/>
                </CombinedDataProvider> 
                <LogoutButton >
                  <Button variant="contained" color="primary">
                    Logout
                  </Button>
                </LogoutButton>
              </div>
            </>
          ) : (
            <>
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl} className="login_button">
                <Button variant="contained" color="primary" /* onClick={savePoints(session,webId)} */>
                  Login
                  </Button>
              </LoginButton> 
            </>
          )}

          
        </nav>
        
      )
}
