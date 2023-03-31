import { Card,Button } from "@material-ui/core";

import Comment from './Comment'
import comment from "./Comment";
import {useState} from "react";


export default function Comments (props){

    const commentList = props.list.map((name)=>{
        return(
            <Comment comment={name}/>
        );
    })
    return <div>
        {commentList}

    </div>;
}