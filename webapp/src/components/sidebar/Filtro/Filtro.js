import "./Filtro.css"
import {BubbleChart} from "@mui/icons-material";
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
                               if(listaCosasFiltradas[{categoria}]===undefined)
                                   listaCosasFiltradas[{categoria}]={cat:categoria,selected:true};
                               else
                                   listaCosasFiltradas[{categoria}].selected=!listaCosasFiltradas[{categoria}].selected;
                           }
                           }
                       />
                    <Button OnClick={
                        ()=>{
                            filter(listaCosasFiltradas);
                        }
                    }>

                    </Button>

                </div>
            </li>)

    });
    return <div>
        <ul>
            {filterList}
        </ul>
    </div>
}