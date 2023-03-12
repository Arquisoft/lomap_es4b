
import React from "react";

import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography, TextField, FormGroup } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {createPoints,createData,updatePoints,updateData,deletePoints} from "../helper/PodHelper";
import MapView from "./map/MapView";

/* async function getPoint(webId){
  console.log(webId);
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  console.log(profileDocumentURI);
  let solidDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  console.log(solidDataset);


  //crea un objeto
  const  newAddressThing = buildThing(createThing({ coordenada: "55" }))
    .build();

    solidDataset = setThing(solidDataset,newAddressThing);
    saveSolidDatasetAt(webId, solidDataset, { fetch: fetch });

   
  
}  */



const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;

  console.log(webId);

  return (

    <Container fixed>
{/*       <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.role.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.organization_name.iri.value} />
            </Typography>
          </CardContent>

          

          <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <Image property={VCARD.hasPhoto.iri.value} width={200} />
          </CardActionArea>

        </Card>
      </CombinedDataProvider>
      <LogoutButton >
        <Button style={{ marginTop: 20 }} variant="contained" color="primary">
          Logout
        </Button>
      </LogoutButton>
 */}


      <Button
        onClick={() =>{
          updatePoints(213123, 123132, 12123, "CasaCarlos", session, webId).then(file => updateData(file,webId,session)); 
        }}>
          Modificar
      </Button>

        <Button
        onClick={() =>{
          deletePoints(213123, 123132, 12123, "CasaCarlos", session, webId).then(file => updateData(file,webId,session)); 
        }}>
          Eliminar
      </Button>

      <MapView />
 
    </Container>
  );
}

export default ProfileViewer