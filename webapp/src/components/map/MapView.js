import React, {Component, useEffect} from "react";
import ReactDOM  from "react-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import AddMarker from'./AddMarker';
import AddPointForm from "./AddPointForm";
import ProfileViewer from "../ProfileViewer";


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
        markers: [],
    };
  }

    centerMapOnPoint(location) {
        if (this.state.map != null) {
            this.state.map.target.flyTo(location, this.state.map.target.getZoom());
        }
    }

    updateMarkers(points){
      // Borramos los anteriores markers
        for(let i = 0; i < this.state.markers.length; i++){
            this.state.map.target.removeLayer(this.state.markers[i]);
        }

        //creamos los nuevos markers
        for (let i=0; i < points.length; i++) {
            // Por cada punto se crea un marcador, asociandole el id del punto
            let lat = points[i].latitude;
            let lng = points[i].longitude;
            AddMarker([lat, lng], this.state.map.target, points[i].id, points[i].category, this.state.markers, this.state.webId, this.state.session);
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

          map.webId = this.state.webId;
          map.session = this.state.session;
          map.markers  = this.state.markers;
          map.target.on("click", function (e) {
              const {lat, lng} = e.latlng;
              let formDiv = document.createElement('div');
              let popup = L.popup();
              ReactDOM.render(
                  <AddPointForm position={e.latlng} map={map.target} markers={map.markers} webId={map.webId} session={map.session} popup={popup}/>,
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
