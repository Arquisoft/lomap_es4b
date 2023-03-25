
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import MenuIcon from "@mui/icons-material/Menu"
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt"
import WrongLocationIcon from "@mui/icons-material/WrongLocation"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import GroupIcon from "@mui/icons-material/Group"
import InfoIcon from "@mui/icons-material/Info"
import SortIcon from "@mui/icons-material/Sort"
import { updatePoints,filterPoints,deletePoints,getFriendWebId,friendsPruebas} from '../../helper/PodHelper';

import "./SideBar.css"

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {session, webId, marcadorSeleccionado,setMarcadorSeleccionado} = props;


    return(
        <Sidebar className="sideBar">
            
            <Menu className='menu'>

                <MenuItem className='menuItem'
                    icon={<MenuIcon />}
                    onClick={() => {
                    collapseSidebar();
                    }}
                    style={{ textAlign: "center" }}
                    >
                    {" "}
                </MenuItem>

                <SubMenu className="subMenu" label="Gestionar puntos" icon={<SortIcon />}>
                    <MenuItem className='subMenuItem'
                        icon={<FmdGoodIcon />}
                        onClick={()=>{
                            if(marcadorSeleccionado){
                                setMarcadorSeleccionado(false);
                            }else{
                                setMarcadorSeleccionado(true);
                            }
                        }}
                    > Ver puntos
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<AddLocationAltIcon />} 
                        onClick={() =>
                            { updatePoints(43.430423, -5.839197, "Aaron", "sdfdsfdsf", "Museo",session, webId);}}>
                        Añadir punto 
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<WrongLocationIcon />} 
                        onClick={() =>
                            { deletePoints(session,webId, "lv4uyijk6njok08057qg");}}> 
                        Eliminar punto 
                    </MenuItem>
                    <MenuItem className='subMenuItem' 
                        icon={<FilterAltIcon />}
                        onClick={ () => 
                            { filterPoints(session, webId,["Casa", "Resturante"]) } }> 
                        Filtrar puntos 
                    </MenuItem>

                </SubMenu >
                
                <MenuItem className='menuItem'
                    icon={<GroupIcon />} 
                    onClick={() => 
                        { getFriendWebId(webId,session);}}> 
                    Amigos 
                </MenuItem>
                <MenuItem className='menuItem'
                    icon={<GroupIcon />} 
                    onClick={() => 
                        { friendsPruebas(webId,session,"pnfg4sbeh1clz4vr2d96");}}> 
                    Amigos Pruebas
                </MenuItem>
            
                <MenuItem className='menuItem'
                    icon={<InfoIcon />} 
                    > About </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SideBar