import "./Filtro.css"
import {BubbleChart} from "@mui/icons-material";
import {Button} from "@material-ui/core";
import React, { useState } from "react";
import {filterPoints} from "../../../helper/PodHelper"
import {Category} from "../../../entities/Entities";


export function Filtro(props){
    const [listaCosasFiltradas, setListaCosasFiltradas] = useState([]) ;
    const {session, webId} = props;
    var listaFiltro=Category;
    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            //Add checked item into checkList
            setListaCosasFiltradas([...listaCosasFiltradas, value]);
        } else {
            //Remove unchecked item from checkList
            const filteredList = listaCosasFiltradas.filter((item) => item !== value);
            setListaCosasFiltradas(filteredList);
        }



    };

    const filterList = listaFiltro.map((categoria)=>{
        return (
                <div className={"filaFiltro"}>
                    <img src={ "\\lomap_es4b\\webapp\\src\\images\\"+categoria.category+".png"} alt={categoria.text}/>
                    <label class="label" htmlFor={"checkbox"+categoria.category}>{categoria.text}</label>
                    <input type="checkbox"
                        id={"checkbox"+categoria.text}
                        name={categoria.text}
                        value={categoria.category}
                           onChange={handleSelect}
                       />


                </div>)

    });

    return (
    <div className={"filtro"}>
        <h2>
            Seleccione las categorías a filtrar
        </h2>
            {filterList}
        <div className={"botonFiltro"}>
            <Button color="blue" variant={"outlined"} size="large"onClick={
                async ()=>{
                    var puntos = await filterPoints(session,webId,listaCosasFiltradas);
                }
            }>
                Filtrar
            </Button>
        </div>
    </div>);
}