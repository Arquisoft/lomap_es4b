import { Card,Button } from "@material-ui/core";
import { Container , CardContent, Typography, CardActionArea} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import {Text} from 'react-native';
class Comment{
    Comment(username,text){
        return <Card>
            <h2 value={ username}></h2>
            <p value = {text}> text</p>
        </Card>;
    }
    constructor(username,text){
        return <Card>
            <h2 value={ username}></h2>
            <p value = {text}> text</p>
        </Card>;
    }
}
export default Comment = (props)=>{
    const{comment} =props;

    return <Card>
        <h2 text={ comment.author}></h2>
        <Typography gutterBottom variant="h5" component="h2">
                    <Text>
                        {"Nombre del autor: "+ (comment.author)}
                    </Text>
        </Typography>
        <Typography gutterBottom >
            <Text>
                {"Fecha: "+(comment.date)}
            </Text>
        </Typography>
        <Typography gutterBottom >
                    <Text>
                        {"Comentario: "+(comment.comment)}
                    </Text>
        </Typography>
    </Card>;
}