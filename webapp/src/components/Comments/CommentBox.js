import { Card,Button, Typography } from "@material-ui/core";
import Comments from './Comments'
import {Text} from 'react-native';
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

export default CommentBox = (username)=>{
    return <Card>
        <Typography>
            <Text>
                {"Introduzca su comentario"}
            </Text>
        </Typography>
    
    <input id = "Comments" type={<textarea name="" id="" cols="30" rows="10"></textarea>}/>
    <Button variant="contained" color="primary">
        Submit
    </Button>

</Card>;
}