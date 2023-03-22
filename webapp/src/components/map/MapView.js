import {Component, useEffect, useState } from "react";
import ReactDOM  from "react-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddMarker from'./AddMarker'
import {IconLocation} from "./IconLocation";
import InfoAndComments from "../Comments/InfoAndComments";
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
    this.markersPoints = [];
    if(props.isLogged){

      coordinatesPoints(props.session, props.webId)
      .then((points) => {
        for(var p in points){
          this.markersPoints.push(points[p]); 
        }

      });
      console.log("Los puntos cargados del pod son "+this.markersPoints);
    }else{
      this.markersPoints = [[43.3548096, -5.8534699]];  //marcas de la base de datos
    }

    this.state = {
      markers: this.markersPoints,
    };


  }

  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers: markers})
  }


  render() {
    return (
      <MapContainer id="map"
        center={[43.3548096, -5.8534699]}
        zoom={15}
        //style={{ width: "100%", height: "81.9vh" }}
        scrollWheelZoom

        whenReady={(map) => {
          console.log(map);
          map.target.on("click", function (e) {
            const { lat, lng } = e.latlng;
            const marker = L.marker([lat, lng], {icon: IconLocation, riseOnHover:true});
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

        {this.state.markers.map((position, idx) => 
          <AddMarker ident={idx} markerPosition={position} />
        )}
      </MapContainer>
    );
  }
}
