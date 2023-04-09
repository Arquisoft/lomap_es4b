import React, { Component } from 'react'
import Reviews from "./Reviews";
import Comments from "./Comments";
import GeneralView from "./GeneralView";
import './PointInfo.css';
import {getSpecificPoint} from "../../helper/PodHelper";
import LoadingSpinner from "./LoadingSpinner";
import {Button} from "@material-ui/core";
import {ButtonGroup} from "@mui/material";

class PointInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            content: null,
            point: null,
            marker: this.props.marker,
            map: this.props.map,
            mapId: this.props.mapId,
            webId: this.props.webId,
            session: this.props.session,
            isOwner: this.props.isOwner,
            reviews: null,
            comments: null,
            pictures: null,
            isLoading: true,
        }
        getSpecificPoint(this.props.session, this.props.webId, this.props.pointId,this.props.mapId).then((point) => {
            this.setState({point: point});
            this.setState({reviews:point.reviewScores});
            this.setState({comments: point.comments});
            this.setState({pictures: point.pictures})
            this.setState({content: this.renderGeneralViewContent()});
            this.setState({isLoading: false});
            }
        )

        this.handleGeneralViewClick = this.handleGeneralViewClick.bind(this)
        this.handleReviewsClick = this.handleReviewsClick.bind(this)
        this.handleCommentsClick = this.handleCommentsClick.bind(this)
        this.updateReviews = this.updateReviews.bind(this)
        this.updateComments = this.updateComments.bind(this)
        this.updatePictures = this.updatePictures.bind(this)
    }

    updateReviews(reviews){
        this.setState({reviews: reviews});
    }

    updateComments(comments){
        this.setState({comments: comments});
    }

    updatePictures(pictures){
        this.setState({pictures: pictures});
    }

    renderGeneralViewContent(){
        return (
            <GeneralView point={this.state.point} mapId={this.state.mapId} isOwner={this.state.isOwner} marker={this.state.marker} 
            map={this.state.map} webId={this.state.webId} session={this.state.session} updatePictures={this.updatePictures}
            pictures={this.state.pictures}/>
        )
    }

    renderReviewContent(){
        return (
            <Reviews reviews={this.state.reviews} updateReviews={this.updateReviews} pointId={this.state.point.id} mapId={this.state.mapId} session={this.state.session} webId={this.state.webId}/>
    )
    }

    renderCommentsContent(){
        return (
            <Comments comments={this.state.comments} updateComments={this.updateComments} pointId={this.state.point.id} mapId={this.state.mapId} session={this.state.session} webId={this.state.webId}/>
        )
    }

    handleGeneralViewClick(){
        this.setState({
            msg : 'Course Content',
            content : this.renderGeneralViewContent()
        })
    }
    handleReviewsClick(){
        this.setState({
            msg : 'Course Content',
            content : this.renderReviewContent()
        })
    }
    handleCommentsClick(){

        // Changing state
        this.setState({
            msg : 'Course Content',
            content : this.renderCommentsContent()
        })
    }

    renderPointInfo(){
        return (
            <div>
                {/* Informacion general del punto(titulo, autor y categoria*/}
                <h1>{this.state.point.name} ({this.state.point.author})</h1>
                <h2>{this.state.point.category}</h2>
                {/*Vista general del punto: descripcion e imagenes*/}
                <div className='pointInfoMenuButtons'>
                    <button className='button-48' onClick={this.handleGeneralViewClick}>
                        Vista general
                    </button>
                    {/*Reseñas del punto: ver puntuacion media, reseñas y posiblidad de crear una nueva reseña*/}
                    <button className='button-48' onClick={this.handleReviewsClick}>
                        Reseñas
                    </button>
                    {/*Comentarios del punto: Ver comentarios y posibilidad de crear un nuevo comentario*/}
                    <button className='button-48' onClick={this.handleCommentsClick}>
                        Comentarios
                    </button>
                </div>
                <p>{this.state.content}</p>
            </div>
        );
    }

    render(){
        return (
            <div>
            {this.state.isLoading ? <LoadingSpinner /> : this.renderPointInfo()}
            </div>
        )
    }
}

export default PointInfo