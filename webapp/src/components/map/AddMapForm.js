import React, {Component} from "react";
import CreatePoint from "./CreatePoint"
import {addMap} from "../../helper/PodMaps.js"
import './MapView.css'

export default class AddMapForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            webId: this.props.webId,
            session: this.props.session,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        alert('Nuevo mapa \"' + this.state.name + '\" creado.');
        event.preventDefault();
        addMap(this.state.name, this.state.session, this.state.webId)
    }

    render() {
        return (
            <div className="addMapForm">
            <form  onSubmit={this.handleSubmit}>
                <h2 className="addMapHeader">Agregar Mapa</h2>
                <p className="addMapText">Dale un nombre al mapa:</p>
                <div className="inputAndButton">
                    <input className="addMapName" type="text" placeholder="Nombre del mapa"
                        value={this.state.name} onChange={this.handleChangeName} />
                    <input className="addMapButton" type="submit" value="Agregar mapa" />
                </div>
            </form>
            </div>
        );
    }
}