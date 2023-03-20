import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import comment from "./Comment";
import {useState} from "react";


export default function Comments (list){
    const [comments,setComments] = useState(list);
    const commentList = this.comments.map((name,commentText)=>{
        return(
            <Comment username= {name} comment={commentText}/>
        );
    })
    return <div>
        {commentList}

    </div>;
}