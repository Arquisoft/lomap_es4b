import { useState, useEffect} from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Container} from "@material-ui/core";
import MapView from "../map/MapView";
import SideBar from "../sidebar/SideBar";
import "./ProfileViewer.css"
import MarkersList from '../markersList/Markerslist';
import MapList from '../mapList/MapList';
import FriendsList  from "../friendsList/FriendsList";
import AddFriendForm  from "../friendsList/AddFriendForm";
import AddMapForm from "../map/AddMapForm";
import {friendsAclPermission} from "../../helper/PodHelper";


const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const [marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado] =  useState(false);
  const [marcadorMapasSeleccionado,setMarcadorMapasSeleccionado] = useState(false);
  const [marcadorFriendsSeleccionado,setMarcadorFriendsSeleccionado] = useState(false);
  const [marcadorAñadirMapaSeleccionado, setMarcadorAñadirMapaSeleccionado] = useState(false);
  const [marcadorAñadirAmigoSeleccionado, setMarcadorAñadirAmigoSeleccionado] = useState(false);
  const [mapView, setMapView] = useState(null);


  useEffect(() => {
    const fetchFriendPermissions = async() => {
      friendsAclPermission(webId,session);
    }
    fetchFriendPermissions();
  }, []);


  return (
    <Container maxWidth={false} disableGutters={true} id="profileContainer">

      <div className="profileViewer">

      <SideBar className="sideBar" session={session} webId={webId}
        marcadorPuntosSeleccionado={marcadorPuntosSeleccionado} setMarcadorPuntosSeleccionado={setMarcadorPuntosSeleccionado}
        marcadorMapasSeleccionado={marcadorMapasSeleccionado } setMarcadorMapasSeleccionado={setMarcadorMapasSeleccionado}
        marcadorFriendsSeleccionado={marcadorFriendsSeleccionado } setMarcadorFriendsSeleccionado={setMarcadorFriendsSeleccionado}
        marcadorAñadirMapaSeleccionado={marcadorAñadirMapaSeleccionado} setMarcadorAñadirMapaSeleccionado={setMarcadorAñadirMapaSeleccionado}
        marcadorAñadirAmigoSeleccionado={marcadorAñadirAmigoSeleccionado} setMarcadorAñadirAmigoSeleccionado={setMarcadorAñadirAmigoSeleccionado}/>

          {/* Le pasa la referencia a la funcion centerMapOnPoint de MapView */}
          {marcadorPuntosSeleccionado ?
              <MarkersList centerMap={(position) => {mapView.centerMapOnPoint(position)}} session={session} webId={webId}></MarkersList>
              :
              null
          }

      {marcadorMapasSeleccionado ?
        <MapList showMapPoints={(points, webId) => {mapView.updateMarkers(points, webId)}} session={session} webId={webId}></MapList>
        :
        null
      }
      {marcadorFriendsSeleccionado ?
        <FriendsList showFriendPoints={(points, webId) => {mapView.updateMarkers(points, webId)}} session={session} webId={webId}></FriendsList>
        :
        null
      }
      {marcadorAñadirMapaSeleccionado ?
        <AddMapForm session={session} webId={webId}></AddMapForm>
        :
        null
      }
      {marcadorAñadirAmigoSeleccionado ?
        <AddFriendForm session={session} webId={webId}></AddFriendForm>
        :
        null
      }

          {/* Guarda la instancia del mapView en el mapView de profileViewer */}
          <MapView ref={instance => { setMapView(instance)}} session={session}  webId={webId} isLogged={true}/>
      </div>
 
    </Container>
  );
}

export default ProfileViewer