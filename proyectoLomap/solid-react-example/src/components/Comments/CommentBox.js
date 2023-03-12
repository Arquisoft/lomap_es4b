import { Card } from "@material-ui/core";
import Comments from './Comments/Comments'
class CommentBox{
    comments = new Comments();
    username;
    constructor(username) {
        this.comments = new Comments();
        this.username = username;
    }

    CommentBox(username){
        this(username);
        return <Card>
            <h2 id={"titulo"}>Introduzca su comentario:</h2>
            <label labelfor = "Comments">Caja de comentarios</label>
            <input id = "Comments" type={<textarea name="" id="" cols="30" rows="10"></textarea>}/>
            <Button variant="contained" color="primary">
                Submit
                OnClick={this.register()}
            </Button>

        </Card>;
    }
    register(){
        this.comments.registerComment(this.username, "hola");

    }
}
