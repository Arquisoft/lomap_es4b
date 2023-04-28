import L from 'leaflet';


export default function Icon(category){
    const IconLocation = L.icon({
        iconUrl: require('../images/' + category + '.png'),
        iconRetinaUrl: require('../images/blue-marker.png'),
        iconAnchor:null,
        shadowUrl:null,
        shadowSize:null,
        shadowAnchor:null,
        iconSize: [50,50],
        className:"leaflet-venue-icon",
    });
    return IconLocation;
}


