import {Component} from "react";
import {addFriend} from "../../helper/PodFriends";
import './FriendList.css'

export default class AddFriendForm extends Component {
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
        event.preventDefault();
       addFriend(this.state.webId, this.state.session, this.state.name);
    }

    render() {
        return (
            <div className="addMapForm">
            <form  onSubmit={this.handleSubmit}>
                <h2 className="addFriendHeader">Agregar Amigo</h2>
                <p className="addFriendText">Introduce el nombre:</p>
                <div className="inputAndButton">
                    <input className="addFriendName" type="text" placeholder="Nombre del amigo"
                        value={this.state.name} onChange={this.handleChangeName} />
                    <input className="addFriendButton" type="submit" value="Agregar amigo" />

                </div>
            </form>
            </div>
        );
    }
}

