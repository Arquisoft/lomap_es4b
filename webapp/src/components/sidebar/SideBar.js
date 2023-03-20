
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


import "./SideBar.css"
import {Filtro} from "./Filtro/Filtro";

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {marcadorSeleccionado,setMarcadorSeleccionado} = props;

    return(
        <Sidebar className="sideBar">
            
            <Menu className="menu">
            <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={() => {
                    collapseSidebar();
                    }}
                    style={{ textAlign: "center" }}
                >
                    {" "}
            </MenuItem>
                <SubMenu className="subMenu" label="Otro">
                    <MenuItem className='menuItem'> Pie charts </MenuItem>
                    <MenuItem className='menuItem'> Line charts </MenuItem>
                </SubMenu >
                    <MenuItem className='menuItem' 
                    onClick={()=>{
                        if(marcadorSeleccionado){
                            setMarcadorSeleccionado(false);
                        }else{
                            setMarcadorSeleccionado(true);
                        }
                    }}
                    > Marcadores</MenuItem>
                    <MenuItem className='menuItem'> About </MenuItem>
                <SubMenu className="menuFiltro" label="Filtrar puntos">
                    <MenuItem className="subMenuFiltro" label="filtros">
                        <Filtro listaFiltro={["Restaurante","Museo"]}>

                        </Filtro>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SideBar