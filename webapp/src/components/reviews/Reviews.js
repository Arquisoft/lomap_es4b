import { Card,Button } from "@material-ui/core";
import "./Reviews.css"
import Review from './Review'
import {useState} from "react";


export default function Reviews (props){

    const reviewList = props.list.map((name)=>{
        return(
            <Review review={name}/>
        );
    })
    return <div class={"main"}>
        <h2>
            Reseñas
        </h2>
        {reviewList}

    </div>;
}