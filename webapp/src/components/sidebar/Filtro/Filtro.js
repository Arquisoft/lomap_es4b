import "./Filtro.css"
export function Filtro(listaFiltros){
    const listaCosasFiltradas = [];

    const filterList = listaFiltros.listaFiltro.map((categoria)=>{
        return (
            <li>
                <div>
                    <label class="label" htmlFor={"checkbox"+categoria}>{categoria}</label>
                    <input type="checkbox"
                        id={"checkbox"+categoria}
                        name={categoria}
                        value={categoria}
                           onClick={()=>{
                               if(this.listaCosasFiltradas[{categoria}]===undefined)
                                   this.listaCosasFiltradas[{categoria}]={cat:categoria,selected:true};
                               else
                                   this.listaCosasFiltradas[{categoria}].selected=!this.listaCosasFiltradas[{categoria}].selected;
                           }
                           }
                       />

                </div>
            </li>)

    });
    return <div>
        <ul>
            {filterList}
        </ul>
    </div>
}