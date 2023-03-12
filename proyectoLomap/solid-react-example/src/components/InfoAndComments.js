import { Container } from "@material-ui/core";
import Comments from './Comments/Comments'
import CommentsBox from './Comments/CommentBox'
const InfoAndComments = (userName) =>{
    return(
        <Container>
        <Card style={{ maxWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <Text property={"Nombre del autor:"} />
                </Typography>
            </CardContent>
            <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
            </CardActionArea>

        </Card>
            <Card style={{ maxWidth: 200 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Text property={"Comentarios"} />
                    </Typography>
                    <Comments {username = userName}>
                    </Comments>
                </CardContent>
                <CardActionArea style={{ justifyContent: "left", display: "flex" }}>
                </CardActionArea>
            </Card>
            <Card>
                <CommentsBox {username = userName}>

                </CommentsBox>
            </Card>
        </Container>
    );
}