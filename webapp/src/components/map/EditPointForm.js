import React, {Component} from "react";
import {editPoint} from "../../helper/PodHelper";

export default class EditPointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name,
            comment: this.props.comment,
            category: this.props.category,
            pointId: this.props.pointId,
            latLng: this.props.latLng,
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
        alert('Punto editado con titulo: ' + this.state.name + ', categoria:' + this.state.category +', comentario:' + this.state.comment);
        event.preventDefault();
        console.log(this.state.latLng.lat);
        editPoint(this.state.pointId, this.state.latLng.lat, this.state.latLng.lng, this.state.name, this.state.comment, this.state.category, this.state.session, this.state.webId).then();
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
                    <input type="submit" value="Editar punto" />
                </ul>
            </form>
        );
    }
}