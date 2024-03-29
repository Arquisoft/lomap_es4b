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
    const [loadingAllPoints, setLoadingAllPoints] = useState(false);
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
                <div key={categoria.category} className={"filaFiltro"} >
                    <img className={"icono"} src={ image} alt={categoria.text}/>
                    <label className="label" htmlFor={"checkbox"+categoria.category}>{categoria.text}</label>
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
        <div className="listaFiltros">
            {filterList}
        </div>
        <div className={"divBotonFiltro"} >
        <button className={"botonFiltro"} data-testid ={"filtrar"}onClick={
                async ()=>{
                    setLoadingFilteredPoints(true);
                    filterPoints(session,webId,listaCosasFiltradas, mapId).then((puntos)=>{
                        console.log(puntos);
                        props.showFilteredPoints(puntos, webId, mapId);
                        setLoadingFilteredPoints(false);
                    }).catch(error => {
                        console.log(error);
                        setLoadingFilteredPoints(false);
                    });
                }
            }>
                {loadingFilteredPoints && <ListLoadingItem/>}
                {loadingFilteredPoints ? <span>Filtrando</span> : <span>Filtrar</span>}
            </button>
            <button className={"botonFiltroTodo"} data-testid ={"filtrarTodo"}onClick={
                async ()=>{
                    setLoadingAllPoints(true);
                    filterPoints(session,webId,listaFiltro.map(e=>{return e.category}), mapId).then((puntos)=>{
                        console.log(puntos);
                        props.showFilteredPoints(puntos, webId, mapId);
                        setLoadingAllPoints(false);
                    }).catch(error => {
                        console.log(error);
                        setLoadingAllPoints(false);
                    });

                }
            }>
                {loadingAllPoints && <ListLoadingItem/>}
                {loadingAllPoints ? <span>Cargando</span> : <span>Ver todos</span>}
            </button>
        </div>
    </div>);

}
export default Filtro;