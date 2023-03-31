import React, {Component, useEffect} from "react";
import ReactDOM  from "react-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddMarker from'./AddMarker'
import AddPointForm from "./AddPointForm";
import {getAllPointsInCurrentMap} from "../../helper/PodHelper";


// Centra el mapa a la ubicacion actual del navegador
function LocationMarker() {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);
}

export default class MapView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      session: props.session,
      webId: props.webId,
      isLogged: props.isLogged,
        map: null,
    };
  }

    centerMapOnPoint(location) {
        if (this.state.map != null) {
            this.state.map.target.flyTo(location, this.state.map.target.getZoom());
        }
    }

  render() {
    return (
      <MapContainer id="map"
        center={[43.3548096, -5.8534699]}
        zoom={13}
        //style={{ width: "100%", height: "81.9vh" }}
        scrollWheelZoom

        whenReady={(map) => {
            this.setState({map: map});
          // Si esta logeado se muestran los puntos del POD
          if(this.state.isLogged){
              // Se obtienen los puntos encapsulados en objetos Point
              getAllPointsInCurrentMap(this.state.session, this.state.webId)
                .then((points) => {
                    for (let i=0; i < points.length; i++) {
                      // Por cada punto se crea un marcador, asociandole el id del punto
                      let lat = points[i].latitude;
                      let lng = points[i].longitude;
                      AddMarker([lat, lng], map.target, points[i].id, points[i].category, this.state.webId, this.state.session);
                  }
                });
          }
          // aqui se mostrarian los puntos publicos
          else {
              //AddMarker([43.3548096, -5.8534699], map.target, 1);
          }
          map.webId = this.state.webId;
          map.session = this.state.session;

          map.target.on("click", function (e) {
              const { lat, lng } = e.latlng;
              let formDiv = document.createElement('div');
              let popup = L.popup();
              ReactDOM.render(
                  <AddPointForm position={e.latlng} map={map.target} webId={map.webId} session={map.session} popup={popup}/>,
                  formDiv
              );

                  popup.setLatLng([lat, lng])
                  .setContent(formDiv)
                  .openOn(map.target);
          });
        }}
        >      
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    );
  }
}
