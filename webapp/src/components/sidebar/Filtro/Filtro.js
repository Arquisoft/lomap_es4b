import "./Filtro.css"
import React, { useState } from "react";
import {filterPoints} from "../../../helper/PodHelper"
import {Category} from "../../../entities/Entities";
import {ListLoadingItem} from "../../loadingComponents/ListLoadingItem";



export function Filtro(props){
    const [listaCosasFiltradas, setListaCosasFiltradas] = useState([]) ;
    const {session, webId, mapId} = props;
    let listaFiltro=Category;
    const [loadingFilteredPoints, setLoadingFilteredPoints] = useState(false);
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
        let image = require('../../../images/' + categoria.category + '.png');
        return (
                <div className={"filaFiltro"} >
                    <img className={"icono"} src={ image} alt={categoria.text}/>
                    <label class="label" htmlFor={"checkbox"+categoria.category}>{categoria.text}</label>
                    <input type="checkbox"
                        id={"checkbox"+categoria.text}
                        name={categoria.text}
                        value={categoria.category}
                        data-testid ={categoria.category}
                        onChange={handleSelect}
                       />


                </div>)

    });

    return (
    <div className={"filtro"}>
        <h2 className={"tituloFiltro"}data-testid={"tituloFiltro"}>
            Seleccione las categorías a filtrar
        </h2>
            {filterList}
        <div className={"divBotonFiltroTodo"} >
            <button className={"botonFiltroTodo"} data-testid ={"filtrarTodo"}onClick={
                async ()=>{
                    console.log(session);
                    console.log(webId);
                    console.log(props.mapId);
                    setLoadingFilteredPoints(true);
                    filterPoints(session,webId,listaFiltro.map(e=>{e.category}), mapId).then((puntos)=>{
                        console.log(puntos);
                        props.showFilteredPoints(puntos, webId, mapId);
                        setLoadingFilteredPoints(false);
                    });

                }
            }>
                {loadingFilteredPoints && <ListLoadingItem/>}
                {loadingFilteredPoints ? <span>Mostrando</span> : <span>Mostrar todos</span>}
            </button>
        </div>
        <div className={"divBotonFiltro"} >
            <button className={"botonFiltro"} data-testid ={"filtrar"}onClick={
                async ()=>{
                    console.log(session);
                    console.log(webId);
                    console.log(props.mapId);
                    setLoadingFilteredPoints(true);
                    filterPoints(session,webId,listaCosasFiltradas, mapId).then((puntos)=>{
                        console.log(puntos);
                        props.showFilteredPoints(puntos, webId, mapId);
                        setLoadingFilteredPoints(false);
                    });
                }
            }>
                {loadingFilteredPoints && <ListLoadingItem/>}
                {loadingFilteredPoints ? <span>Filtrando</span> : <span>Filtrar</span>}
            </button>
        </div>
    </div>);

}
export default Filtro;