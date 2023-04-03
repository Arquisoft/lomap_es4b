import React, {Component} from "react";
import {editPoint} from "../../helper/PodHelper";
import {Category} from '../../entities/Entities';
import Icon from "./IconLocation";

export default class EditPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name,
            description: this.props.description,
            category: this.props.category,
            pointId: this.props.pointId,
            latLng: this.props.latLng,
            popup: this.props.popup,
            map: this.props.map,
            marker: this.props.marker,
            webId: this.props.webId,
            session: this.props.session,
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
        alert('Punto editado con titulo: ' + this.state.name + ', categoria:' + this.state.category +', descripcion:' + this.state.description);
        event.preventDefault();
        editPoint(this.state.pointId, this.state.latLng.lat, this.state.latLng.lng, this.state.name, this.state.description, this.state.category, this.state.session, this.state.webId).then(
            this.state.marker.setIcon(Icon(this.state.category)),
            this.state.map.removeLayer(this.state.popup)
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Editar Punto</h1>
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
                                    <option key={item.category}  value={item.category}>{item.text}</option>
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
                    <input type="submit" value="Editar punto" />
                </ul>
            </form>
        );
    }
}