import { useState, useEffect } from "react";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession, Text} from "@inrupt/solid-ui-react";
import { Button} from "@material-ui/core";
import logo from '../../images/lomapLogo2.png';
import { VCARD, FOAF } from "@inrupt/lit-generated-vocab-common";
import pordefecto from '../../images/default-user.jpg';
import "./NavBar.css"
import {getImageFromPod} from "../../helper/PodHelper";
import {getAllMaps} from "../../helper/PodMaps";

export default function Navbar(props){
    const [idp, setIdp] = useState("https://inrupt.net/");
    //const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const { session } = useSession();
    const { webId } = session.info;
    const {logggin} = props;
    const listaProveedores = [{url:"https://inrupt.net/"}, {url:"https://solidcommunity.net/"}];
    const [imagen, setImagen]  = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);

  }, [setCurrentUrl]);


    const handleChange = (event)=>{
        const value = event.target.value;
        setIdp(value);
    }
    const handleChangeIcon = (id)=>{
        const fetchImage = async() => {
            console.log(id);
            let image = await getImageFromPod(id);
            if(image == 'NoImage'){
                image = pordefecto;
            }
            setImagen(image);
        }
        if(logggin)
            fetchImage();
    }
    return (
        <nav className="navBar">

            <a href="/home">
                <img src={logo} className="lomapImg" alt="Logo de Lomap"/>
            </a>


            {logggin ? (


                <>
                    <div className="navProfile">
                        <CombinedDataProvider datasetUrl={webId} thingUrl={webId} className="image-button" style={{flexDirection: 'row'}}
                        onChange={handleChangeIcon(webId)}>
                            <img className={"icono"} src={ imagen} alt="Foto de perfil del usuario"/>
                            <Text className="profileName" property={FOAF.name.iri.value}/>
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
                    <div className="navLogin">
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
                    </div>
                </>
            )}




          
        </nav>
        
      )
}
