import {Component, React, useEffect, useState } from "react";
import ReactDOM  from "react-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddMarker from'./AddMarker'
import {IconLocation} from "./IconLocation";
import InfoAndComments from "../InfoAndComments";



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

export default class MapView extends  Component{
  constructor(props) {
    super(props);
    this.state = {
      markers: [[43.3548057,-5.8512759],[43.3609476,-5.8503508],[43.5416735,-5.65240765],[43.5539325,-5.618994]],
    };
  }

  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers: markers})
  }


  render() {
    return (
      <MapContainer
        center={[43.3548096, -5.8534699]}
        zoom={15}
        style={{ width: "100%", height: "81.9vh" }}
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
