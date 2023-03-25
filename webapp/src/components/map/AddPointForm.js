import React, {Component} from "react";
import AddMarker from "./AddMarker";
import {randomId} from "../../helper/PodHelper";
import CreatePoint from "./CreatePoint"
import {useSession} from "@inrupt/solid-ui-react";

export default class AddPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',
            comment: '',
            category: 'monument',
            position: this.props.position,
            map: this.props.map,
            webId: this.props.webId,
            session: this.props.session,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        alert('Nuevo punto creado con titulo: ' + this.state.name + ', categoria:' + this.state.category +', comentario:' + this.state.comment);
        event.preventDefault();
        //AddMarker(this.state.position,this.state.map, randomId());
        console.log(this.state.position.lat);
        CreatePoint(this.state.position, this.state.map, this.state.name, this.state.comment, this.state.category, this.state.webId, this.state.session);
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