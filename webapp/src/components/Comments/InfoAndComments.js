import { Container , Card, CardContent, Typography, CardActionArea} from "@material-ui/core";
import Comments from './Comments'
import {Text} from 'react-native';
import { Button} from "@material-ui/core";
import EditPoint from "../map/EditPoint";
import DeletePoint from "../map/DeletePoint";

const InfoAndComments = (props) =>{
    const {point,marker,map, webId, session, isOwner} = props;
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