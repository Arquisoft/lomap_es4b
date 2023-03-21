import {Component, React, useEffect, useState, useRef } from "react";
import ReactDOM  from "react-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddMarker from'./AddMarker'
import {IconLocation} from "./IconLocation";
import InfoAndComments from "../Comments/InfoAndComments";
import AddPointForm from "./AddPointForm";
import {coordinatesPoints} from "../../helper/PointsManager";


function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
 

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
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
    };


  }
  render() {
    return (
      <MapContainer id="map"
        center={[43.3548096, -5.8534699]}
        zoom={15}
        //style={{ width: "100%", height: "81.9vh" }}
        scrollWheelZoom

        whenReady={(map) => {
          // Si esta logeado se muestran los puntos del POD
          if(this.state.isLogged){
            coordinatesPoints(this.state.session, this.state.webId)
                .then((points) => {
                  for(let p in points){
                    const marker = L.marker(points[p], {icon: IconLocation, riseOnHover:true});
                    let myDiv = document.createElement('div');
                    ReactDOM.render(
                        <InfoAndComments/>,
                        myDiv
                    );
                    marker.bindPopup(myDiv).openPopup();
                    marker.addTo(map.target);
                  }
                });
          }
          // aqui se mostrarian los puntos publicos
          else {
              const marker = L.marker([43.3548096, -5.8534699], {icon: IconLocation, riseOnHover:true});
              let myDiv = document.createElement('div');
              ReactDOM.render(
                  <InfoAndComments/>,
                  myDiv
              );
              marker.bindPopup(myDiv).openPopup();
              marker.addTo(map.target);
          }

          console.log(map);
          map.target.on("click", function (e) {
            const { lat, lng } = e.latlng;
            const marker = L.marker([lat, lng], {icon: IconLocation, riseOnHover:true});
            // guardar el id de los puntos con este atributo?? (lo he creado yo, no es uno predefinido)
            marker.pointId = 1;
            console.log('id del marcador: ' + marker.pointId);
              var formDiv = document.createElement('div');
              ReactDOM.render(
                  <AddPointForm/>,
                  formDiv
              );
              var popup = L.popup()
                  .setLatLng([lat, lng])
                  .setContent(formDiv)
                  .openOn(map.target);
            //marker.bindPopup('<p>Marcador con click </p>').openPopup();
            //marker.bindPopup(ReactDOMServer.renderToString(<InfoAndComments />)).openPopup();
            var myDiv = document.createElement('div');
            ReactDOM.render(
               <InfoAndComments/>,
               myDiv
            );
            marker.bindPopup(myDiv).openPopup();
            marker.addTo(map.target);

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
