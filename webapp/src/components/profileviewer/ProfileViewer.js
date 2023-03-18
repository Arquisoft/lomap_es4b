
import React from "react";
import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography, TextField, FormGroup } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {updatePoints,getAllPoints, createFirstFile, deletePoints} from "../../helper/PodHelper";
import MapView from "../map/MapView";
import InfoAndComments from "../Comments/InfoAndComments";
import SideBar from "../sidebar/SideBar";
import "./ProfileViewer.css"


const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  
  return (



    <Container maxWidth={false} disableGutters={true} >

      <div className="profileViewer">

      <SideBar></SideBar>
      <Button
        onClick={() =>{ updatePoints(43.402301,-5.808376, "Casa de Abuela", "Mu rica la comida", "Private",session, webId);}}>
          Modificar
      </Button>

      <Button
        onClick={() =>{ deletePoints(session,webId, "x3jq4fsqyzlaxj2z00dj");}}>
          Delete
      </Button>

        <MapView session={session}  webId={webId} isLogged={true}/>
      
      </div>
 
    </Container>
  );
}

export default ProfileViewer