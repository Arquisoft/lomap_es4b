import {Component} from "react";
import {addFriend,friendsAclPermission} from "../../helper/PodFriends";
import './FriendList.css'

export default class AddFriendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            webId: this.props.webId,
            session: this.props.session,
            setMarcadorAñadirAmigoSeleccionado: this.props.setMarcadorAñadirAmigoSeleccionado,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
       addFriend(this.state.webId, this.state.session, this.state.name).then(
        ()=>{
            friendsAclPermission(this.state.webId, this.state.session);
        }
        );
       
       this.state.setMarcadorAñadirAmigoSeleccionado(false);
    }

    render() {
        return (
            <div className="addFriendForm">
            <form  onSubmit={this.handleSubmit}>
                <h2  className="addFriendHeader">Agregar Amigo</h2>
                <p className="addFriendText">Introduce el webId:</p>
                <div className="inputAndButton">
                    <input data-testid = "nombreAmigo" className="addFriendName" type="text" placeholder="WebId del amigo"
                        value={this.state.name} onChange={this.handleChangeName} />
                    <input data-testid = "botonAmigo" className="addFriendButton" type="submit" value="Agregar amigo" />

                </div>
            </form>
            </div>
        );
    }
}

