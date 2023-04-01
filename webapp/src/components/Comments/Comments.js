import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import "./Comments.css";
import comment from "./Comment";
import {useState} from "react";


export default function Comments (props){

    const commentList = props.list.map((name)=>{
        return(
            <Comment comment={name}/>
        );
    })
    return <div class={"main"}>
        {commentList}

    </div>;
}