import {Container, Card, CardContent, Typography, CardActionArea, Button} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import Comments from './Comments'
import CommentsBox from './CommentBox'
import {Text} from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";


const InfoAndComments = (userName) =>{
    return(
        <div id = "infoAndComments">
            <Container >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={'span'}>
                            <Text property={"Nombre del sitio:"+userName}>
                                {"Lugar: "+userName.userName.name}
                            </Text>
                            <Text property={"Nombre del sitio:"+userName}>
                                {"Categoría: "+userName.userName.category}
                            </Text>
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ maxWidth: 200 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={'span'}>
                            <Text property={"Nombre del autor:"+userName}>
                                {"Nombre del autor: "+userName.userName.userName}
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
                        <Comments list = {userName.userName.list} >
                        </Comments>
                    </CardContent>
                    <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
                    </CardActionArea>
                </Card>
                <Card>
                    <CommentsBox username = {userName.userName}>
                    </CommentsBox>
                    <Button OnClick={
                        ()=>{

                        }
                    }>
                        Borrar punto
                    </Button>
                </Card>

            </Container>
        </div>
    );
}

export default InfoAndComments