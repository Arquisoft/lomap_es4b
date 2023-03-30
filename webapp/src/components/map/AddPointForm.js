import React, {Component} from "react";
import CreatePoint from "./CreatePoint"

export default class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
            description: '',
            category: 'monument',
            position: this.props.position,
            map: this.props.map,
            popup: this.props.popup,
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
        alert('Nuevo punto creado con titulo: ' + this.state.name + ', categoria:' + this.state.category +', comentario:' + this.state.description);
        event.preventDefault();
        CreatePoint(this.state.position, this.state.map, this.state.name, this.state.description, this.state.category, this.state.webId, this.state.session);
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
                                <option value="restaurant">Restaurante</option>
                                <option value="monument">Monumento</option>
                                <option value="hospital">Hospital</option>
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