import { Card,Button } from "@material-ui/core";
import { Container , CardContent, Typography, CardActionArea} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import {Text} from 'react-native';
class Review {
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
export default Review = (props)=>{
    const{review} =props;

    return <Card>
        <h2 text={ review.author}></h2>
        <Typography gutterBottom variant="h5" component="h2">
                    <Text>
                        {"Nombre del reseñador: "+ (review.author)}
                    </Text>
        </Typography>
        <Typography gutterBottom >
            <Text>
                {"Fecha: "+(review.date)}
            </Text>
        </Typography>
        <Typography gutterBottom >
                    <Text>
                        {"Reseña: "+(review.score)}
                    </Text>
        </Typography>
    </Card>;
}