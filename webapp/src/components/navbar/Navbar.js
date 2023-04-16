import { useState, useEffect } from "react";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession, Text} from "@inrupt/solid-ui-react";
import { Button} from "@material-ui/core";
import logo from '../../images/lomapLogo.png';
import { VCARD, FOAF } from "@inrupt/lit-generated-vocab-common";
import pordefecto from '../../images/default-user.jpg';
import "./NavBar.css"

export default function Navbar(props){
    const [idp, setIdp] = useState("https://inrupt.net/");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");
    const { session } = useSession();
    const { webId } = session.info;
    const {logggin} = props;
    const listaProveedores = [{url:"https://inrupt.net/"}, {url:"https://solidcommunity.net/"}];


  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);


    const handleChange = (event)=>{
        const value = event.target.value;
        setIdp(value);
    }
    return (
        <nav className="navBar">

            <a href="/home">
                <img src={logo} alt="Logo de Lomap"/>
            </a>


            {logggin ? (
                <>
                    <div className="navProfile">
                        <CombinedDataProvider datasetUrl={webId} thingUrl={webId} className="image-button" style={{flexDirection: 'row'}}>
                            <Image property={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:70, height:70, borderRadius:40}}/>
                            <Text property={FOAF.name.iri.value} style={{ fontSize: 18 }}/>
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
                    <select value={idp} onChange={handleChange}>
                        <option value="a">Selecciona un Proveedor</option>
                        {listaProveedores.map((proveedor) => (
                            <option key={proveedor.url} value={proveedor.url}>
                                {proveedor.url}
                            </option>
                        ))}
                    </select>
                    <LoginButton oidcIssuer={idp} redirectUrl={currentUrl} className="login_button">
                        <Button type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                            Login
                        </Button>
                    </LoginButton>
                </>
            )}

          {logggin ? (
            <>
              <div className="navProfile">
              <CombinedDataProvider datasetUrl={webId} thingUrl={webId} className="image-button" style={{flexDirection: 'row'}}>
                  {typeof VCARD.hasPhoto.iri.value === null ? (
                    <>
                     <img src={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:70, height:70, borderRadius:40}}
                     onError={event => {
                          event.target.src = pordefecto
                          event.onerror = null
                        }}
                    />
                    </>
                  ):(
                    <>
                     <Image property={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:70, height:70, borderRadius:40}} />
                    </>
                  )}
                  {/* <Image property={VCARD.hasPhoto.iri.value} alt="Foto de perfil del usuario" style={{width:70, height:70, borderRadius:40}}/> */}

                  <Text property={FOAF.name.iri.value} style={{ fontSize: 18 }}/>
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
                <select value={idp} onChange={handleChange}>
                    <option value="a">Selecciona un Proveedor</option>
                    {listaProveedores.map((proveedor) => (
                        <option key={proveedor.url} value={proveedor.url}>
                            {proveedor.url}
                        </option>
                    ))}
                </select>
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
