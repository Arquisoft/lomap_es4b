
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import { useState } from 'react';
import MenuIcon from "@mui/icons-material/Menu"
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt"
import WrongLocationIcon from "@mui/icons-material/WrongLocation"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import GroupIcon from "@mui/icons-material/Group"
import InfoIcon from "@mui/icons-material/Info"
import SortIcon from "@mui/icons-material/Sort"
import { updatePoints,filterPoints,deletePoints,friendsAclPermission} from '../../helper/PodHelper';

import "./SideBar.css"
import MarkersList from '../markersList/Markerslist';

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {session, webId, marcadorSeleccionado,setMarcadorSeleccionado} = props;
    const [isOpen, setOpen] = useState(true);

    return(
        <div className='sideBar'>
        <Sidebar>
            <Menu className='menu' menuItemStyles={{
                button: {
                    '&:hover': {
                     backgroundColor: 'Highlight',
                    },
                },
            }}>

                <MenuItem className='menuItem'
                    icon={<MenuIcon />}
                    onClick={() => {
                    collapseSidebar();
                    setOpen(!isOpen);
                    setMarcadorSeleccionado(false);
                    }}
                    style={{ textAlign: "center" }}
                    >
                    {" "}
                </MenuItem>

                <SubMenu className="subMenu" label={isOpen? "Gestionar puntos" : ""} icon={<SortIcon />}
                        onClick={()=> {if(!isOpen){
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <MenuItem className="subMenuItem" label="Ver puntos"
                        icon={<FmdGoodIcon />}
                        onClick={()=>{ setMarcadorSeleccionado(!marcadorSeleccionado)
                        }}>
                       Ver puntos
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<AddLocationAltIcon />} 
                        onClick={() =>
                            { updatePoints(43.430423, -5.839197, "McDondals", "Restaurante de comida rápida", "Restaurante",session, webId);}}>
                        Añadir punto </MenuItem>
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
                
                <MenuItem className='menuItem' label="Amigos"
                    icon={<GroupIcon />} 
                    onClick={() => { 
                        if(isOpen){
                            getFriendWebId(webId);
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div style={{display : isOpen? "block" : "none"}}>Amigos</div>
                </MenuItem>
                <MenuItem className='menuItem' 
                    icon={<InfoIcon />} onClick={() => { 
                        if(isOpen){
                            
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div style={{display : isOpen? "block" : "none"}}>About</div> 
                </MenuItem>
            </Menu>
        </Sidebar>
        </div>
    );
}

export default SideBar