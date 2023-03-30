import { Container , Card, CardContent, Typography, CardActionArea} from "@material-ui/core";
import { LoginButton, LogoutButton, CombinedDataProvider, Image, useSession} from "@inrupt/solid-ui-react";
import Comments from './Comments'
import CommentsBox from './CommentBox'
import {Text} from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import {getSpecificPoint} from ".//../../helper/PodHelper"
import { Button} from "@material-ui/core";

const InfoAndComments = (props) =>{
    const {username, pointId,marker,map,webId, session} = props;
    const point = getSpecificPoint(session,webId,pointId);
    return(
        <div id = "infoAndComments">
            <Container >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={'span'}>
                            <Text property={"Nombre del sitio:"+point.name}>
                                {"Lugar: "+point.name}
                            </Text>
                            <Text property={"Nombre del sitio:"+point.category}>
                                {"Categoría: "+point.category}
                            </Text>
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ maxWidth: 200 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={'span'}>
                            <Text property={"Nombre del autor:"+point.author}>
                                {"Nombre del autor: "+point.author}
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
                        /*<Comments list = {point.comments} >
                        </Comments>*/
                    </CardContent>
                    <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
                    </CardActionArea>
                </Card>
                <Card>

                </Card>
                <Button variant="contained" color="primary" onClick={() => {
                }}>
                    Edit
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                }}>
                    Delete
                </Button>

            </Container>
        </div>
    );
}

export default InfoAndComments