import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import comment from "./Comment";
import {useState} from "react";


export default function Comments (props){
    const [comments,setComments] = (props.list);
    const commentList = props.list.map((name)=>{
        if(comments===undefined)
            return<p></p>
        return(
            <Comment username= {name.name} comment={name.commentText}/>
        );
    })
    return <div>
        {commentList}

    </div>;
}