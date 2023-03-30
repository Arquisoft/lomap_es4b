import "./Filtro.css"
import {BubbleChart} from "@mui/icons-material";
import {Button} from "@material-ui/core";
import React, { useState } from "react";
import {filterPoints} from "../../../helper/PodHelper"
export function Filtro(props){
    const [listaCosasFiltradas, setListaCosasFiltradas] = useState([]) ;
    const {session, webId} = props;
    var listaFiltro=["Restaurante","Museo"];
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
            <li>
                <div>
                    <label class="label" htmlFor={"checkbox"+categoria}>{categoria}</label>
                    <input type="checkbox"
                        id={"checkbox"+categoria}
                        name={categoria}
                        value={categoria}
                           onChange={handleSelect}
                       />


                </div>
            </li>)

    });

    return <div>
        <ul>
            {filterList}
            <Button onClick={
                ()=>{
                    filterPoints(session,webId,listaCosasFiltradas);
                }
            }>
                Filtrar
            </Button>
        </ul>
    </div>
}