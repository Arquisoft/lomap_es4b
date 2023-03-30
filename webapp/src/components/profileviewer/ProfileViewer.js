import { useState} from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography, TextField, FormGroup } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {updatePoints, filterPoints, deletePoints, getFriendWebId} from "../../helper/PodHelper";
import MapView from "../map/MapView";
import InfoAndComments from "../Comments/InfoAndComments";
import SideBar from "../sidebar/SideBar";
import "./ProfileViewer.css"
import MarkersList from '../markersList/Markerslist';
import MapList from '../mapList/MapList';
import FriendsList  from "../friendsList/FriendsList";
import AddMapForm from "../map/AddMapForm";


const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const [marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado] =  useState(false);
  const [marcadorMapasSeleccionado,setMarcadorMapasSeleccionado] = useState(false);
  const [marcadorFriendsSeleccionado,setMarcadorFriendsSeleccionado] = useState(false);
  const [marcadorAñadirMapaSeleccionado, setMarcadorAñadirMapaSeleccionado] = useState(false);

  return (

    <Container maxWidth={false} disableGutters={true} id="profileContainer">

      <div className="profileViewer">

      <SideBar className="sideBar" session={session} webId={webId}
        marcadorPuntosSeleccionado={marcadorPuntosSeleccionado} setMarcadorPuntosSeleccionado={setMarcadorPuntosSeleccionado}
        marcadorMapasSeleccionado={marcadorMapasSeleccionado } setMarcadorMapasSeleccionado={setMarcadorMapasSeleccionado}
        marcadorFriendsSeleccionado={marcadorFriendsSeleccionado } setMarcadorFriendsSeleccionado={setMarcadorFriendsSeleccionado}
        marcadorAñadirMapaSeleccionado={marcadorAñadirMapaSeleccionado} setMarcadorAñadirMapaSeleccionado={setMarcadorAñadirMapaSeleccionado}/>

      {marcadorPuntosSeleccionado ? 
        <MarkersList session={session} webId={webId}></MarkersList>
        :
        null
      }
      {marcadorMapasSeleccionado ?
        <MapList session={session} webId={webId}></MapList>
        :
        null
      }
      {marcadorFriendsSeleccionado ?
        <FriendsList session={session} webId={webId}></FriendsList>
        :
        null
      }
      {marcadorAñadirMapaSeleccionado ?
        <AddMapForm session={session} webId={webId}></AddMapForm>
        :
        null
      }

        <MapView session={session}  webId={webId} isLogged={true}/>
      
      </div>
 
    </Container>
  );
}

export default ProfileViewer