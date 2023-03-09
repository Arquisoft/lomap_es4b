import { useState, useEffect } from "react";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, CardActionArea, IconButton, MoreVertIcon, Avatar } from "@material-ui/core";
import App from "../App"
import logo from '../images/lomapLogo.png';
import { VCARD } from "@inrupt/lit-generated-vocab-common";


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
              <CombinedDataProvider datasetUrl={webId} thingUrl={webId} className="image-button">  
                  <Image property={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:80, height:80, borderRadius:40}}/>     
              </CombinedDataProvider>
              <LogoutButton >
                <Button style={{ marginTop: 20 }} variant="contained" color="primary">
                  Logout
                </Button>
              </LogoutButton>
            </>
          ) : (
            <>
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl} className="login_button">
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
            </>
          )}

          
        </nav>
        
      )
}
