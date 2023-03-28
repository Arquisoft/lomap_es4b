import { Card,Button, Typography } from "@material-ui/core";
import Comments from './Comments'
import {Text} from 'react-native';


export default function CommentBox  (username){
    return <Card>
        <Typography>
            <Text>
                {"Introduzca su comentario"}
            </Text>
        </Typography>
    
    <input id = "Comments" type={<textarea name="" id="" cols="30" rows="10"></textarea>}/>
    <Button variant="contained" color="primary">
        Submit
    </Button>

</Card>;
}