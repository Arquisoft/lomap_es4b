import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import comment from "./Comment";
class Comments{
    lista;
    Comments(username){
        this.lista = new Array();
        return <Card>
            <Comment username = {"a"}  comment = {"hola"}>
            </Comment>
            <Comment username = {"uo281835"}  comment = {"hola"}>
            </Comment>
            <Comment username = {"aaa"}  comment = {"hola"}>
            </Comment>
        </Card>;
    }

    registerComment(username,comment){
        this.lista.push(new Comment(username, comment));
    }
}
 
export default function Comments (list){
    const [comments,setComments] = useState(list);
    const commentList = comments.lista.map((name,commentText)=>{
        return(
            <Comment username= {name} comment={commentText}/>
        );
    })
    return <div>
            {commentList}

        </div>;
}