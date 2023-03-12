import {React, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddMarker from'./AddMarker'


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

export default function MapView() {
  return (
    <div className="mapView">
      <MapContainer
        center={[43.3548096, -5.8534699]}
        zoom={15}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <AddMarker markerPosition={[43.3548057,-5.8512759]}/> 
        <AddMarker markerPosition={[43.3609476,-5.8503508]} />
        <AddMarker markerPosition={[43.5416735,-5.65240765]}/>
        <AddMarker markerPosition={[43.5539325,-5.618994]}/>
      </MapContainer>
    </div>
  );
}
