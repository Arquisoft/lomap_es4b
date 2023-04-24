import React, {Component} from "react";
import {editPoint} from "../../../helper/PodHelper";
import {Category} from '../../../entities/Entities';
import Icon from "../iconLocation/IconLocation";
import {ListLoadingItem} from "../../loadingComponents/ListLoadingItem";

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
            mapId: this.props.mapId,
            marker: this.props.marker,
            webId: this.props.webId,
            session: this.props.session,
            pointEditing: false,
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
        event.preventDefault();
        this.setState({pointEditing: true});
        editPoint(this.state.pointId, this.state.latLng.lat, this.state.latLng.lng, this.state.name, this.state.description, this.state.category, this.state.session, this.state.webId,this.state.mapId).then(() => {
            this.state.marker.setIcon(Icon(this.state.category));
            this.setState({pointEditing: false});
            this.state.map.removeLayer(this.state.popup);
            alert('Punto editado con titulo: ' + this.state.name + ', categoria:' + this.state.category + ', descripcion:' + this.state.description);
        }
    );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1 className='pointFormHeader'>Edicion de Punto</h1>
                <label>
                    Titulo:
                    <input type="text" placeholder="Titulo" value={this.state.name} onChange={this.handleChangeName} required maxLength='20'/>
                </label>
                <label>
                    Selecciona una categoria:
                    <div className="select-style">
                    <select value={this.state.category} onChange={this.handleChangeCategory}>
                        {
                            Category.map((item) => (
                                <option key={item.category}  value={item.category}>{item.text}</option>
                            ))
                        }
                    </select>
                    </div>
                </label>
                <label>
                    Descripcion:
                    <input type="text" placeholder="Descripcion" value={this.state.description} onChange={this.handleChangeDescription} required maxLength='50'/>
                </label>
                <button type="submit" className="pointFormSubmit" onClick={this.handleSubmit} disabled={this.state.pointEditing}>
                    {this.state.pointEditing && <ListLoadingItem/>}
                    {this.state.pointEditing ? <span>Editando</span> : <span>Editar Punto</span>}
                </button>
            </form>
        );
    }
}