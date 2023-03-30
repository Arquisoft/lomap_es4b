
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import {useState} from 'react';
import MenuIcon from "@mui/icons-material/Menu"
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt"
import WrongLocationIcon from "@mui/icons-material/WrongLocation"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import GroupIcon from "@mui/icons-material/Group"
import InfoIcon from "@mui/icons-material/Info"
import SortIcon from "@mui/icons-material/Sort"
import MapIcon from '@mui/icons-material/Map';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { updatePoints,filterPoints,deletePoints,friendsAclPermission, addMap, editPoint, addComment} from '../../helper/PodHelper';
import {Filtro} from "./Filtro/Filtro";

import "./SideBar.css"

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {session, webId, marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado, marcadorMapasSeleccionado, setMarcadorMapasSeleccionado,
        marcadorFriendsSeleccionado, setMarcadorFriendsSeleccionado} = props;
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
                    setMarcadorPuntosSeleccionado(false);
                    setMarcadorMapasSeleccionado(false);
                    setMarcadorFriendsSeleccionado(false);
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
                        onClick={()=>{ 
                            setMarcadorMapasSeleccionado(false);
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorPuntosSeleccionado(!marcadorPuntosSeleccionado);
                        }}>
                       Ver puntos
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<AddLocationAltIcon />} 
                        onClick={() =>
                            { addComment("1","l170widsl8p51hwjc4b4","Comentairo de prueba",session,webId)}}>
                        Añadir punto </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<WrongLocationIcon />} 
                        onClick={() =>
                            { deletePoints(session,webId, "txo5ke76cjs5r5r3pg1x");}}> 
                        Eliminar punto </MenuItem>
                    <MenuItem className="subMenuFiltro" label="filtros">
                        <Filtro listaFiltro={["restaurant","museum"]} session={session} webId={webId}>
                        </Filtro>
                    </MenuItem>
                </SubMenu >

                <SubMenu className="subMenu" label={isOpen? "Gestionar mapas" : ""} icon={<SortIcon />}
                        onClick={()=> {if(!isOpen){
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <MenuItem className="subMenuItem"
                        icon={<MapIcon />}
                        onClick={()=>{
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorPuntosSeleccionado(false); 
                            setMarcadorMapasSeleccionado(!marcadorMapasSeleccionado);
                        }}>
                       Ver mapas
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<AddCircleIcon />} 
                        onClick={() =>
                            { addMap("Mapita nuevo", "Descripción del nuevo mapa", session, webId) }}>
                        Añadir mapa </MenuItem>
                </SubMenu >
                
                <MenuItem className='menuItem' label="Amigos"
                    icon={<GroupIcon />} 
                    onClick={() => { 
                        if(isOpen){
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorMapasSeleccionado(false); 
                            setMarcadorFriendsSeleccionado(!marcadorFriendsSeleccionado);
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div style={{display : isOpen? "block" : "none"}}>Amigos</div>
                </MenuItem>
                <MenuItem className='menuItem'
                    icon={<GroupIcon />} 
                    onClick={() => { 
                        if(isOpen){
                            friendsAclPermission(webId,session);
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div style={{display : isOpen? "block" : "none"}}>Dar Permisos Amigos</div>
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