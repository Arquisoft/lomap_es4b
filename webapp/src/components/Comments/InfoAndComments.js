import { Container , Card, CardContent, Typography, CardActionArea} from "@material-ui/core";
import Comments from './Comments'
import {Text} from 'react-native';
import { Button} from "@material-ui/core";
import EditPoint from "../map/editPoint/EditPoint";
import DeletePoint from "../map/deletePoint/DeletePoint";
import CommentBox from "./CommentBox";
import ReviewBox from "../reviews/ReviewBox";
import {getSpecificPoint} from "../../helper/PodHelper";
import Reviews from "../reviews/Reviews";
import {useState} from "react";
import ReactDOM from "react-dom";
import "./InfoAndComments.css"

const InfoAndComments = (props) =>{
    const {point,marker,map, webId, session, isOwner} = props;

    const refrescar = ()=>{
        getSpecificPoint(session, webId, point.id,1).then((p) => {
            let myDiv = document.createElement('div');
            ReactDOM.render(
                <InfoAndComments point={p} marker={marker} map={map} webId={webId} session={session} />,
                myDiv
            );
            marker.bindPopup(myDiv).openPopup();
        });
    };
    return(
        <div id = "infoAndComments" >
            <Container class={"main"}>
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
                        <Comments list = {point.comments} >
                        </Comments>
                    </CardContent>
                    <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
                    </CardActionArea>
                </Card>
                <CommentBox mapId = {map} pointId = {point} session={session} webId={webId}  refresh={refrescar}>
                </CommentBox>
                <Card>
                    <Reviews list={point.reviewScores}/>
                    <ReviewBox mapId = {map} pointId = {point} session={session} webId={webId} refresh={refrescar}>

                    </ReviewBox>
                </Card>

                <Button variant="contained" color="primary" onClick={() => {
                    EditPoint(point.id, marker, map, webId, session);
                }}>
                    Edit
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                    DeletePoint(point.id, marker, map, session, webId);
                }}>
                    Delete
                </Button>

                {isOwner?
                    <Button variant="contained" color="primary" onClick={() => {
                        EditPoint(point.id, marker, map, webId, session);
                    }}>
                        Edit
                    </Button>
                    : null}


                {isOwner?
                    <Button variant="contained" color="primary" onClick={() => {
                        DeletePoint(point.id, marker, map, session, webId);
                    }}>Delete
                    </Button>
                : null}
            </Container>
        </div>
    );
}

export default InfoAndComments