import { useState, useEffect} from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Container} from "@material-ui/core";
import MapView from "../map/mapView/MapView";
import SideBar from "../sidebar/SideBar";
import "./ProfileViewer.css"
import MarkersList from '../markersList/Markerslist';
import MapList from '../mapList/MapList';
import FriendsList  from "../friendsList/FriendsList";
import AddFriendForm  from "../friendsList/AddFriendForm";
import AddMapForm from "../map/addMap/AddMapForm";
import {friendsAclPermission} from "../../helper/PodFriends";
import {Filtro} from "../sidebar/Filtro/Filtro";
import LoadedMapInfo from "../map/loadedMapInfo/LoadedMapInfo";
import About from "../about/About";


const ProfileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const [marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado] =  useState(false);
  const [marcadorMapasSeleccionado,setMarcadorMapasSeleccionado] = useState(false);
  const [marcadorFriendsSeleccionado,setMarcadorFriendsSeleccionado] = useState(false);
  const [marcadorAñadirMapaSeleccionado, setMarcadorAñadirMapaSeleccionado] = useState(false);
  const [marcadorAñadirAmigoSeleccionado, setMarcadorAñadirAmigoSeleccionado] = useState(false);
  const [marcadorFiltroSeleccionado, setMarcadorFiltroSeleccionado] = useState(false);
  const [marcadorAboutSeleccionado, setMarcadorAboutSeleccionado] = useState(false);
  const [mapView, setMapView] = useState(null);
  const [currentMapId, setCurrentMapId] = useState("1");
  const [currentMapWebId, setCurrentMapWebId] = useState(webId);
  const [pointsLoading, setPointsLoading] = useState(false);
  const [mapsLoading, setMapsLoading] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);


  useEffect(() => {
    const fetchFriendPermissions = async() => {
      friendsAclPermission(webId,session);
    }
    fetchFriendPermissions();
  }, []);


  return (
    <Container maxWidth={false} disableGutters={true} id="profileContainer">

      <div className="profileViewer">

        {/*Información del mapa actualmente cargado*/}
      <LoadedMapInfo mapId={currentMapId} webId={currentMapWebId} session={session}></LoadedMapInfo>

      <SideBar data-testid = "sidebarProfile" className="sideBar" 
        marcadorPuntosSeleccionado={marcadorPuntosSeleccionado} setMarcadorPuntosSeleccionado={setMarcadorPuntosSeleccionado}
        marcadorMapasSeleccionado={marcadorMapasSeleccionado } setMarcadorMapasSeleccionado={setMarcadorMapasSeleccionado}
        marcadorFriendsSeleccionado={marcadorFriendsSeleccionado } setMarcadorFriendsSeleccionado={setMarcadorFriendsSeleccionado}
        marcadorAñadirMapaSeleccionado={marcadorAñadirMapaSeleccionado} setMarcadorAñadirMapaSeleccionado={setMarcadorAñadirMapaSeleccionado}
        marcadorAñadirAmigoSeleccionado={marcadorAñadirAmigoSeleccionado} setMarcadorAñadirAmigoSeleccionado={setMarcadorAñadirAmigoSeleccionado}
        marcadorFiltroSeleccionado={marcadorFiltroSeleccionado} setMarcadorFiltroSeleccionado={setMarcadorFiltroSeleccionado}
        marcadorAboutSeleccionado={marcadorAboutSeleccionado} setMarcadorAboutSeleccionado={setMarcadorAboutSeleccionado}
               pointsLoading={pointsLoading} mapsLoading={mapsLoading} friendsLoading={friendsLoading}
      />

      {/* Le pasa la referencia a la funcion centerMapOnPoint de MapView */}
      {marcadorPuntosSeleccionado ?
        <MarkersList setPointsLoading={setPointsLoading} centerMap={(position, pointId) => {mapView.centerMapOnPoint(position, pointId)}} mapId={currentMapId} session={session} webId={currentMapWebId}></MarkersList>
        :
        null
      }

      {marcadorMapasSeleccionado ?
        <MapList setMapsLoading={setMapsLoading} showMapPoints={(points, webId, mapId) => {mapView.updateMarkers(points, webId, mapId)}} setCurrentMapId={setCurrentMapId} session={session} webId={webId}></MapList>
        :
        null
      }
      {marcadorFriendsSeleccionado ?
        <FriendsList setFriendsLoading={setFriendsLoading}
                     showFriendPoints={(points, webId, mapId) => {mapView.updateMarkers(points, webId, mapId)}} setCurrentMapId={setCurrentMapId} session={session} webId={webId}></FriendsList>
        :
        null
      }
      {marcadorAñadirMapaSeleccionado ?
        <AddMapForm uploadNewMap={(points, webId, mapId) => {mapView.updateMarkers(points, webId, mapId)}} setMarcadorAñadirMapaSeleccionado={setMarcadorAñadirMapaSeleccionado} setCurrentMapId={setCurrentMapId} session={session} webId={webId}></AddMapForm>
        :
        null
      }
      {marcadorAñadirAmigoSeleccionado ?
        <AddFriendForm session={session} webId={webId} setMarcadorAñadirAmigoSeleccionado={setMarcadorAñadirAmigoSeleccionado}></AddFriendForm>
        :
        null
      }
      {marcadorFiltroSeleccionado ?
        <Filtro showFilteredPoints={(points, webId, mapId) => {mapView.updateMarkers(points, webId, mapId)}} mapId={currentMapId} session={session} webId={currentMapWebId}></Filtro>
        :
        null
      }
          {marcadorAboutSeleccionado ?
              <About marcadorAboutSeleccionado={marcadorAboutSeleccionado} setMarcadorAboutSeleccionado={setMarcadorAboutSeleccionado}></About>
              :
              null
          }

      {/* Guarda la instancia del mapView en el mapView de profileViewer */}
      <MapView ref={instance => { setMapView(instance)}} setCurrentMapId={setCurrentMapId} setCurrentMapWebId={setCurrentMapWebId} 
                session={session}  webId={webId} isLogged={true}/>

      </div>
 
    </Container>
  );
}

export default ProfileViewer