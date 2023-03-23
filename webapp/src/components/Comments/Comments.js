import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import comment from "./Comment";
import {useState} from "react";


export default function Comments (props){

    const commentList = props.list.map((name)=>{
        return(
            <Comment username= {name.userName} comment={name.commentText}/>
        );
    })
    return <div>
        {commentList}

    </div>;
}