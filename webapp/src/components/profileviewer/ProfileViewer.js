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


const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const [marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado] =  useState(false);
  const [marcadorMapasSeleccionado,setMarcadorMapasSeleccionado] = useState(false);
  const [marcadorFriendsSeleccionado,setMarcadorFriendsSeleccionado] = useState(false);
  const [mapView, setMapView] = useState(null);
    return (

    <Container maxWidth={false} disableGutters={true} id="profileContainer">

      <div className="profileViewer">
          <SideBar className="sideBar" session={session} webId={webId}
            marcadorPuntosSeleccionado={marcadorPuntosSeleccionado} setMarcadorPuntosSeleccionado={setMarcadorPuntosSeleccionado}
            marcadorMapasSeleccionado={marcadorMapasSeleccionado } setMarcadorMapasSeleccionado={setMarcadorMapasSeleccionado}
            marcadorFriendsSeleccionado={marcadorFriendsSeleccionado } setMarcadorFriendsSeleccionado={setMarcadorFriendsSeleccionado}/>

          {/* Le pasa la referencia a la funcion centerMapOnPoint de MapView */}
          {marcadorPuntosSeleccionado ?
            <MarkersList centerMap={(position) => {mapView.centerMapOnPoint(position)}} session={session} webId={webId}></MarkersList>
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

          {/* <Button
            onClick={() =>{ updatePoints(43.430423, -5.839197, "Aaron", "sdfdsfdsf", "Museo",session, webId);}}>
              Modificar
          </Button>

          <Button
            onClick={() =>{ deletePoints(session,webId, "x3jq4fsqyzlaxj2z00dj");}}>
              Delete
          </Button>

          <Button
            onClick={() => { getFriendWebId(webId);}}>
              Amigos
          </Button>

          <Button
            onClick={ () => { filterPoints(session, webId,["Casa", "Resturante"]) } }>
              Filtrar Pod
          </Button> */}

          {/* Guarda la instancia del mapView en el mapView de profileViewer */}
          <MapView ref={instance => { setMapView(instance)}} session={session}  webId={webId} isLogged={true}/>
      </div>
 
    </Container>
  );
}

export default ProfileViewer