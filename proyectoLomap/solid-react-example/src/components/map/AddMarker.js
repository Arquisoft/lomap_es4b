import {React, Component} from "react";
import { render } from "react-dom";

import {Marker, Popup} from 'react-leaflet'
import {IconLocation} from "./IconLocation";
import L from "leaflet";

const markerPosition = ['43.3665913', '-5.8439451']

class AddMarker extends Component {

    render() {
        return (
            <Marker key={`marker-${this.props.ident}`} position={this.props.markerPosition} icon={IconLocation} riseOnHover>
                <Popup>
                    Blue marker
                </Popup>
            </Marker>
        );
    }

}




export default AddMarker