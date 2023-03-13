import { Container , Card, CardContent, Typography, CardActionArea} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import Comments from './Comments/Comments'
import CommentsBox from './Comments/CommentBox'
import {Text} from 'react-native';
const InfoAndComments = (userName) =>{
    return(
        <div id = "infoAndComments">
        <Container >
        <Card style={{ maxWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <Text property={"Nombre del autor:"+userName}>
                        {"Nombre del autor: "+userName.userName}
                    </Text>
                </Typography>
            </CardContent>
            <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
            </CardActionArea>

        </Card>
            <Card style={{ maxWidth: 200 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Text property={"Comentarios"} >
                            {"Comentarios"}
                        </Text>
                    </Typography>
                    <Comments username = {userName}>
                    </Comments>
                </CardContent>
                <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
                </CardActionArea>
            </Card>
            <Card>
                <CommentsBox username = {userName}>
                </CommentsBox>
            </Card>
        </Container>
        </div>
    );
}

export default InfoAndComments