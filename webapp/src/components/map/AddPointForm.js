import React, {Component, useEffect, useState} from "react";
import AddMarker from "./AddMarker";
import ReactDOM, { render } from "react-dom";
import L from "leaflet";
import { useMap} from "react-leaflet";
import {IconLocation} from "./IconLocation";
import InfoAndComments from "../Comments/InfoAndComments";
import {wait} from "@testing-library/user-event/dist/utils";

export default class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
        comment: '',
        category: '',
        position: this.props.position,
        map: this.props.map,};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state.position);
        console.log(this.state.map);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeCategory(event) {
        this.setState({category: event.target.value});
    }
    handleChangeComment(event) {
        this.setState({comment: event.target.value});
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
        AddMarker(this.state.position, this.state.map);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Agregar Punto</h1>
                <ul>
                    <li>
                        <label>
                            Titulo:
                            <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                        </label>
                    </li>
                    <li>
                        <label>
                            Selecciona una categoria:
                            <select value={this.state.category} onChange={this.handleChangeCategory}>
                                <option value="restaurant">Restaurante</option>
                                <option value="monument">Monumento</option>
                                <option value="hospital">Hospital</option>
                            </select>
                        </label>
                    </li>
                    <li>
                        <label>
                            Comentario:
                            <input type="text" value={this.state.comment} onChange={this.handleChangeComment} />
                        </label>
                    </li>
                    <input type="submit" value="Agregar punto" />
                </ul>
            </form>
        );
    }
}