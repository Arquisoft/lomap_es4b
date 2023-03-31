import { Card,Button, Typography } from "@material-ui/core";
import Comments from './Comments'
import {Text} from 'react-native';
import {addComment} from "../../helper/PodHelper";
import {useState} from "react";
class CommentBox{
    comments = new Comments();
    username;

    constructor(username){
         this.username = username;
    }
    CommentBox1(username){
       
        this(username);
       
    }
    register(){
        this.comments.registerComment(this.username, "hola");

    }
}

export default CommentBox = (props)=>{
    var [texto, setTexto] = useState("");
    const {mapId,pointId,session,webId} = props;
    const setComentario = event => {
        // 👇️ access textarea value
        setTexto(event.target.value);
        console.log(event.target.value);
    };
    const addComments = event=>{
        addComment(1,pointId.id,texto,session,webId);
    };
    return <Card>
        <Typography>
            <Text>
                {"Introduzca su comentario"}
            </Text>
        </Typography>
    
    <textarea id = "Comments" type={<textarea name="" id="" cols="30" rows="10"></textarea>} onChange={
        setComentario}
    />
    <Button variant="contained" color="primary"
        onClick={addComments}>
        Submit Comment
    </Button>

</Card>;
}