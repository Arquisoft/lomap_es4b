import "./Filtro.css"
import {BubbleChart} from "@mui/icons-material";
import {Button} from "@material-ui/core";
import React, { useState } from "react";
export function Filtro(listaFiltros){
    const [listaCosasFiltradas, setListaCosasFiltradas] = useState([]) ;

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

    const filterList = listaFiltros.listaFiltro.map((categoria)=>{
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
            <Button OnClick={
                ()=>{
                }
            }>

            </Button>
        </ul>
    </div>
}