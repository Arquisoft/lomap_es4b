
import React from "react";

import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography, TextField, FormGroup } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrlAll,
  Thing,
  getUrl,
  removeUrl,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  saveFileInContainer,
  setThing,
  removeThing,
} from "@inrupt/solid-client";

import { Session, fetch } from "@inrupt/solid-client-authn-browser";


 /* async function getProfile(webId) {
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return getThing(myDataset, webId) ; // we obtain the thing we are looking for from the dataset
}

default function prueba(): {
  const [webId, setWebId] = React.useState("https://uo281997.inrupt.net");
  //let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let solidDataset = await getSolidDataset(webId); // obtain the dataset from the URI

  // We create the address
  const newAddressThing = buildThing(createThing())
    .addStringNoLocale(VCARD.street_address,"Alicante")
    .addStringNoLocale(VCARD.locality, "Albacete")
    .build();

  // We have to store also the hasAddress :)
  let hasAddress = getThing(solidDataset, VCARD.hasAddress) ;
  if (hasAddress === null)
    // we create the thing as it has not been done before :(
    hasAddress = buildThing(await getProfile(webId))
      .addUrl(VCARD.hasAddress, newAddressThing.url)
      .build();
  else
    hasAddress = buildThing(hasAddress)
      .addUrl(VCARD.hasAddress, newAddressThing.url)
      .build();

  solidDataset = setThing(solidDataset, newAddressThing);
  solidDataset = setThing(solidDataset, hasAddress);

  return await saveSolidDatasetAt(webId, solidDataset, { fetch: fetch });
}  */

//const session = new Session(); // Sesión de SOLID



async function getPoint(webId){
/*   console.log(webId);
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  console.log(profileDocumentURI);
  let solidDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  console.log(solidDataset);


  //crea un objeto
  const  newAddressThing = buildThing(createThing({ coordenada: "55" }))
    .build();

    solidDataset = setThing(solidDataset,newAddressThing);
    saveSolidDatasetAt(webId, solidDataset, { fetch: fetch });

    */
  
} 

async function printContents(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    console.log(event.target.result);
  }
  reader.readAsText(file);
}


async function obtainFile(name, content) {

    var dates =[{latitud:"123", altitud:"2314"}];

    var r = {
      points: []
    };

    for(var i in dates) {    

      var item = dates[i];   
      var v1 = item.latitud;
      var v2 = item.altitud;
  
      r.points.push({ 
          "x" : v1,
          "y"  : v2
      });
  }
   
  

    const blob = new Blob([JSON.stringify(r, null, 2)], {
      type: "application/json",
    });

    var file = new File([blob], name, { type: blob.type });
    return file;

    return file;
}

async function createData(url, file, session) {
  try {
    let savedFile = await saveFileInContainer(
      url,
      file,
      { slug: file.name, contentType: file.type, fetch: session.fetch }
    );

    printContents(savedFile);
  } catch (error) {
    console.log(error);
  }
}

async function stringJson(x,y){

   return {latitud:x,altitud:y};
}

const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  getPoint(webId);

  return (
    <Container fixed>
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.role.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.role.iri.value} />
            </Typography>
          </CardContent>

          

          <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <Image property={VCARD.hasPhoto.iri.value} width={480} />
          </CardActionArea>

        </Card>
      </CombinedDataProvider>
      <LogoutButton >
        <Button style={{ marginTop: 20 }} variant="contained" color="primary">
          Logout
        </Button>
      </LogoutButton>

       <Button
        onClick={() =>{
          obtainFile("puntos.json", stringJson(23,56)).then(file => createData("https://uo281997.inrupt.net/public/Points/", file, session));
        }}>
          PRUEBA
      </Button>
  
 
    </Container>
  );
}

export default ProfileViewer