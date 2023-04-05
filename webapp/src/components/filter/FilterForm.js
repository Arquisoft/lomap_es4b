import React, { useState } from 'react';
import {filterPoints} from '../../helper/PodHelper';
import {Category} from '../../entities/Entities';
import './FilterForm.css'

export function FilterForm(props) {

    const {session,webId} = props;
    const [listaFiltrada, setListaFiltrada] = useState([]) ;
    const listaFiltro=Category;

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            //Add checked item into checkList
            setListaFiltrada([...listaFiltrada, value]);
        } else {
            //Remove unchecked item from checkList
            const filteredList = listaFiltrada.filter((item) => item !== value);
            setListaFiltrada(filteredList);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(listaFiltrada);
        filterPoints(session,webId,listaFiltrada,1).then((points)=>console.log(points));
    }; 

    return (
        <div className="filterForm">
        <form  onSubmit={handleSubmit}>
            <h2 className="filterHeader">Filtrar Puntos del Mapa</h2>
            <div className='filterList' id='filterList' >
                <ul>
                {
                listaFiltro.map((item) => (
                    <li key={item.text}>
                    <label>
                        <input
                        type="checkbox"
                        name={item.text}
                        onChange={handleSelect}
                        value={item.category}
                        />
                        {item.text}
                    </label>
                    </li>
                ))
                }
                </ul>
          </div>
            <input className="filterPoints" type="submit" value="Filtrar" />
        </form>
    </div>
    );
  }

  export default FilterForm;