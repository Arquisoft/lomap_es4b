import {Container, Card, CardContent, Typography, CardActionArea, Button} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import Comments from './Comments'
import CommentsBox from './CommentBox'
import {Text} from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import EditPoint from "../map/EditPoint";


const InfoAndComments = (userName) =>{
    console.log(userName);
    return(
        <div id = "infoAndComments">
        <Container >
        <Card style={{ maxWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component={'span'}>
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
                    <Typography gutterBottom variant="h5" component={'span'}>
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
            <Button variant="contained" color="primary" onClick={() => {
                EditPoint(userName.pointId,userName.marker, userName.map, userName.webId,userName.session);
            }}>
                Edit
            </Button>
        </Container>
        </div>
    );
}

export default InfoAndComments