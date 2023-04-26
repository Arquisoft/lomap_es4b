import React from "react";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import './GeneralView.css'
import EditPoint from "../../map/editPoint/EditPoint";
import DeletePoint from "../../map/deletePoint/DeletePoint";
import { saveImages } from "../../../helper/ImageHelper";



export default function GeneralView(params){

    const [pictures, setPictures] = React.useState(params.pictures);

    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    function openFileDialog() {
        document.getElementById('fileInput').click();
      }
      
    function handleFileSelect(event) {
        const selectedFile = event.target.files[0];
        saveImages(params.mapId, params.point.id, selectedFile, params.session, params.webId, (picture) => {
            const newList = pictures.concat({author:picture.author, pictureUrl:picture.pictureUrl});
            setPictures(newList);
            params.updatePictures(newList);
        })
    }

    return (
        <div className="generalViewContainer"data-testid={"generalViewContainer"}>
            <p>{params.point.description}</p>
            {pictures.length > 0 && <div className='galleryContainer'>
                <MdChevronLeft data-testid="leftButtonGeneralView" className='mdchevron' onClick={slideLeft} size={40} />
                <div
                    id='slider'
                >
                    {pictures.map((picture) => (
                        <img
                            className='gallery'
                            src={picture.pictureUrl}
                            alt='/'
                        />
                    ))}
                </div>
                <MdChevronRight data-testid="rightButtonGeneralView" className='mdchevron' onClick={slideRight} size={40} />
            </div>}

            <div className='editDelete'>
                {params.isOwner?
                    <button data-testid="editGeneralView" className='button-17' onClick={() => {
                        EditPoint(params.point.id, params.marker, params.map, params.mapId, params.webId, params.session);
                    }}>
                        Editar
                    </button>
                    : null}

                    
                    <button className='button-17' onClick={openFileDialog}>Añadir imagen</button>
                    <input type="file" id="fileInput" onChange={handleFileSelect} accept="image/png,image/jpeg" hidden={true}></input>

                    {params.isOwner?
                    <button id="deleteButton" data-testid="deleteGeneralView" className='button-17' onClick={() => {
                        DeletePoint(params.point.id, params.marker, params.map, params.mapId, params.session, params.webId);
                    }}>Borrar
                    </button>
                    : null}
            </div>
        </div>
    )
}