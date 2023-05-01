import React, {Component} from "react";
import {addMap} from "../../../helper/PodMaps.js"
import '../mapView/MapView.css'
import {ListLoadingItem} from "../../loadingComponents/ListLoadingItem";

export default class AddMapForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            webId: this.props.webId,
            session: this.props.session,
            uploadNewMap: this.props.uploadNewMap,
            setCurrentMapId: this.props.setCurrentMapId,
            setMarcadorAñadirMapaSeleccionado: this.props.setMarcadorAñadirMapaSeleccionado,
            mapCreating : false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({mapCreating: true});
        addMap(this.state.name, this.state.session, this.state.webId).then((mapId) => {
            this.setState({mapCreating: false});
            this.state.setMarcadorAñadirMapaSeleccionado(false);
            this.state.setCurrentMapId(mapId);
            this.state.uploadNewMap([], this.state.webId, mapId);
        }).catch(error => {
            console.log(error);
            this.state.setMarcadorAñadirMapaSeleccionado(false);
        })
    }

    render() {
        return (
            <div className="addMapForm">
            <form  onSubmit={this.handleSubmit}>
                <h2 className="addMapHeader">Añadir Mapa</h2>
                <p className="addMapText">Dale un nombre al mapa:</p>
                <div className="inputAndButton">
                    <input className="addMapName" type="text" placeholder="Nombre del mapa"
                        value={this.state.name} onChange={this.handleChangeName} />
                    <button data-testid="addMapButton" className="addMapButton" type="submit" onClick={this.handleSubmit} disabled={this.state.mapCreating}>
                        {this.state.mapCreating && <ListLoadingItem/>}
                        {this.state.mapCreating ? <span>Creando</span> : <span>Agregar Mapa</span>}
                    </button>
                    {/*<input data-testid="addMapButton" className="addMapButton" type="submit" value="Agregar mapa" />*/}
                </div>
            </form>
            </div>
        );
    }
}