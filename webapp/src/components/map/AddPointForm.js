import React, {Component} from "react";
import CreatePoint from "./CreatePoint";
import {Category} from '../../entities/Entities';


export default class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
            description: '',
            category: Category[0].category,
            position: this.props.position,
            map: this.props.map,
            mapId: this.props.mapId,
            popup: this.props.popup,
            webId: this.props.webId,
            session: this.props.session,
            markers: this.props.markers,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeCategory(event) {
        this.setState({category: event.target.value});
    }
    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleSubmit(event) {
        alert('Nuevo punto creado con titulo: ' + this.state.name + ', categoria:' + this.state.category +', comentario:' + this.state.description);
        event.preventDefault();
        CreatePoint(this.state.position, this.state.map, this.state.mapId, this.state.markers, this.state.name, this.state.description, this.state.category, this.state.webId, this.state.session);
        this.state.map.removeLayer(this.state.popup);
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
                                {
                                    Category.map((item) => (
                                        <option key={item.category} value={item.category}>{item.text}</option>
                                ))
                                }
                            </select>
                        </label>
                    </li>
                    <li>
                        <label>
                            Descripcion:
                            <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
                        </label>
                    </li>
                    <input type="submit" value="Agregar punto" />
                </ul>
            </form>
        );
    }
}