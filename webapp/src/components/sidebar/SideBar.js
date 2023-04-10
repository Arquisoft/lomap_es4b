
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
import {deletePoints,friendsAclPermission,addComment} from '../../helper/PodHelper';
import {Filtro} from "./Filtro/Filtro";
import {saveImages} from '../../helper/ImageHelper';
import "./SideBar.css"

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {session, webId, marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado, marcadorMapasSeleccionado, setMarcadorMapasSeleccionado,
        marcadorFriendsSeleccionado, setMarcadorFriendsSeleccionado, marcadorAñadirMapaSeleccionado, setMarcadorAñadirMapaSeleccionado,
        marcadorAñadirAmigoSeleccionado,setMarcadorAñadirAmigoSeleccionado,marcadorFiltroSeleccionado,setMarcadorFiltroSeleccionado} = props;
    const [isOpen, setOpen] = useState(true);

    return(
        <div className='sideBar'>
        <Sidebar data-testid = "sidebar">
            <Menu data-testid = "sidebarMenu" className='menu' menuItemStyles={{
                button: {
                    '&:hover': {
                     backgroundColor: 'Highlight',
                    },
                },
            }}>

                <MenuItem data-testid = "sidebarFirst" className='menuItem'
                    icon={<MenuIcon />}
                    onClick={() => {
                    collapseSidebar();
                    setOpen(!isOpen);
                    setMarcadorPuntosSeleccionado(false);
                    setMarcadorMapasSeleccionado(false);
                    setMarcadorFriendsSeleccionado(false);
                    setMarcadorAñadirMapaSeleccionado(false);
                    setMarcadorAñadirAmigoSeleccionado(false);
                    setMarcadorFiltroSeleccionado(false);
                    }}
                    style={{ textAlign: "center" }}
                    >
                    {" "}
                </MenuItem>

                <SubMenu data-testid = "sidebarPoints" className="subMenu" label={isOpen? "Gestionar puntos" : ""} icon={<SortIcon />}
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
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
                            setMarcadorPuntosSeleccionado(!marcadorPuntosSeleccionado);
                        }}>
                       Ver puntos
                    </MenuItem>
                    <MenuItem className="subMenuItem" label="Ver puntos"
                        icon={<FilterAltIcon />}
                        onClick={()=>{ 
                            setMarcadorMapasSeleccionado(false);
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorPuntosSeleccionado(false);
                            setMarcadorFiltroSeleccionado(!marcadorFiltroSeleccionado);
                        }}>
                       Filtrar Puntos
                    </MenuItem>
                 
                </SubMenu >

                <SubMenu data-testid = "sidebarMapas" className="subMenu" label={isOpen? "Gestionar mapas" : ""} icon={<SortIcon />}
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
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
                            setMarcadorMapasSeleccionado(!marcadorMapasSeleccionado);
                        }}>
                       Ver mapas
                    </MenuItem>
                    <MenuItem className='subMenuItem'
                        icon={<AddCircleIcon />} 
                        onClick={() =>{
                                setMarcadorFriendsSeleccionado(false);
                                setMarcadorPuntosSeleccionado(false);
                                setMarcadorMapasSeleccionado(false);
                                setMarcadorAñadirAmigoSeleccionado(false);
                                setMarcadorFiltroSeleccionado(false);
                                setMarcadorAñadirMapaSeleccionado(!marcadorAñadirMapaSeleccionado); }}>
                        Añadir mapa </MenuItem>
                </SubMenu >
                
                <MenuItem data-testid = "sidebarFriends" className='menuItem' label="Amigos"
                    icon={<GroupIcon />} 
                    onClick={() => { 
                        if(isOpen){
                            setMarcadorPuntosSeleccionado(false);
                            setMarcadorMapasSeleccionado(false); 
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
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
                        onClick={() =>{
                                setMarcadorFriendsSeleccionado(false);
                                setMarcadorPuntosSeleccionado(false);
                                setMarcadorMapasSeleccionado(false);
                                setMarcadorAñadirMapaSeleccionado(false);
                                setMarcadorFiltroSeleccionado(false);
                                setMarcadorAñadirAmigoSeleccionado(!marcadorAñadirAmigoSeleccionado);
                            }}>
                        Añadir Amigo
                </MenuItem>
                <MenuItem className='menuItem' 
                    icon={<InfoIcon />} onClick={() => { 
                        if(isOpen){
                            saveImages();
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