import { Card,Button, Typography } from "@material-ui/core";
import Comments from './Reviews'
import {Text} from 'react-native';
import {addComment, addScore} from "../../helper/PodHelper";
import {useState} from "react";
class ReviewBox {
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

export default ReviewBox = (props)=>{
    var [review, setRev] = useState(0);
    const {mapId,pointId,session,webId, refresh} = props;
    const setReview = event => {
        // 👇️ access textarea value
        setRev(event.target.value);
        console.log(event.target.value);
    };
    const addReview = event=>{
        addScore(1,pointId.id,review,session,webId).then(refresh);
    };
    return <Card>
        <Typography>
            <Text>
                {"Introduzca su reseña"}
            </Text>
        </Typography>
    
    <input id = "Score" type={"number"} min={0} max={10} onChange={
        setReview}
    />
    <Button variant="contained" color="primary"
        onClick={addReview}>
        Submit Comment
    </Button>

</Card>;
}