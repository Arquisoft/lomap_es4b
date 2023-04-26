import React, {Component} from "react";
import {Category} from '../../../entities/Entities';
import '../PointForm.css';
import {updatePoints} from "../../../helper/PodHelper";
import AddMarker from "../mapView/AddMarker";
import {ListLoadingItem} from "../../loadingComponents/ListLoadingItem";
import { useSession } from "@inrupt/solid-ui-react";


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
            pointCreating: false,
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
        this.setState({pointCreating: true});
        updatePoints(this.state.mapId, this.state.position.lat,this.state.position.lng,this.state.name,this.state.description,this.state.category,this.state.session,this.state.webId).then((id) => {
            AddMarker(this.state.position, this.state.map, this.state.mapId, id, this.state.category, this.state.markers, this.state.webId, this.state.session, true);
            this.setState({pointCreating: false});
            this.state.map.removeLayer(this.state.popup);
        });
    }

    render() {
        return (
            <form id="addPointForm" onSubmit={this.handleSubmit}>
                <h1 className='pointFormHeader'>Añadir Punto</h1>
                <label htmlFor="titulo">
                    Título:
                    <input id="titulo" name="titulo" type="text" placeholder="Titulo" value={this.state.name} onChange={this.handleChangeName} required maxLength='20'/>
                </label>
                <label>
                    Selecciona una categoría:
                    <div className="select-style">
                    <select value={this.state.category} onChange={this.handleChangeCategory}>
                        {
                            Category.map((item) => (
                                <option key={item.category} value={item.category}>{item.text}</option>
                            ))
                        }
                    </select>
                    </div>
                </label>
                <label htmlFor="descripcion">
                    Descripción:
                    <input id="descripcion" name="descripcion" type="text" placeholder="Descripcion" value={this.state.description} onChange={this.handleChangeDescription} required maxLength='50'/>
                </label>
                <button id="addPointSubmit" data-testid={"addPointSubmit"} type="submit" className="pointFormSubmit" onClick={this.handleSubmit} disabled={this.state.pointCreating}>
                    {this.state.pointCreating && <ListLoadingItem/>}
                    {this.state.pointCreating ? <span>Creando</span> : <span>Agregar Punto</span>}
                </button>
            </form>
        );
    }
}
