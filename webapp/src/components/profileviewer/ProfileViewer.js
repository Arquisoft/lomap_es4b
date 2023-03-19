
import React from "react";
import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography, TextField, FormGroup } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {updatePoints,getAllPoints, createFirstFile, deletePoints, getFriendWebId} from "../../helper/PodHelper";
import MapView from "../map/MapView";
import InfoAndComments from "../Comments/InfoAndComments";
import SideBar from "../sidebar/SideBar";
import "./ProfileViewer.css"
import MarkersList from '../markersList/Markerslist';


const ProfileViewer = (props) => {
  const { session } = useSession();
  const { webId } = session.info;
  const {marcadorSeleccionado,setMarcadorSeleccionado} = props;

  return (

    <Container maxWidth={false} disableGutters={true} >

      <div className="profileViewer">

      <SideBar marcadorSeleccionado={marcadorSeleccionado} setMarcadorSeleccionado={setMarcadorSeleccionado}>
      </SideBar>

      {marcadorSeleccionado ? 
        <MarkersList session={session} webId={webId}></MarkersList>
        :
        null
      }

      <Button
        onClick={() =>{ updatePoints(43.430423, -5.839197, "Aaron", "sdfdsfdsf", "Private",session, webId);}}>
          Modificar
      </Button>

      <Button
        onClick={() =>{ deletePoints(session,webId, "x3jq4fsqyzlaxj2z00dj");}}>
          Delete
      </Button>

      <Button
        onClick={() =>{ getFriendWebId(webId);}}>
          Amigos
      </Button>

        <MapView session={session}  webId={webId} isLogged={true}/>
      
      </div>
 
    </Container>
  );
}

export default ProfileViewer