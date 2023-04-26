
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
import "./SideBar.css";
import {SidebarLoadingItem} from '../loadingComponents/SidebarLoadingItem'

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const { marcadorPuntosSeleccionado,setMarcadorPuntosSeleccionado, marcadorMapasSeleccionado, setMarcadorMapasSeleccionado,
        marcadorFriendsSeleccionado, setMarcadorFriendsSeleccionado, marcadorAñadirMapaSeleccionado, setMarcadorAñadirMapaSeleccionado,
        marcadorAñadirAmigoSeleccionado,setMarcadorAñadirAmigoSeleccionado,marcadorFiltroSeleccionado,setMarcadorFiltroSeleccionado,
        marcadorAboutSeleccionado, setMarcadorAboutSeleccionado, pointsLoading, mapsLoading, friendsLoading} = props;
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
                    setMarcadorAboutSeleccionado(false);
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
                    <MenuItem data-testid = "sidebarViewPoints" className="subMenuItem" label="Ver puntos"
                        icon={<FmdGoodIcon />}
                        onClick={()=>{ 
                            setMarcadorMapasSeleccionado(false);
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
                            setMarcadorAboutSeleccionado(false);
                            setMarcadorPuntosSeleccionado(!marcadorPuntosSeleccionado);
                        }}>
                        <div className="menuItemContent" style={{display : "flex"}}>
                            {pointsLoading && <SidebarLoadingItem/>}
                            Ver puntos
                        </div>
                    </MenuItem>
                    <MenuItem data-testid = "sidebarFilterPoints" className="subMenuItem" label="Ver puntos"
                        icon={<FilterAltIcon />}
                        onClick={()=>{ 
                            setMarcadorMapasSeleccionado(false);
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorPuntosSeleccionado(false);
                            setMarcadorAboutSeleccionado(false);
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
                    <MenuItem data-testid = "sidebarViewMaps" className="subMenuItem"
                        icon={<MapIcon />}
                        onClick={()=>{
                            setMarcadorFriendsSeleccionado(false);
                            setMarcadorPuntosSeleccionado(false); 
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
                            setMarcadorAboutSeleccionado(false);
                            setMarcadorMapasSeleccionado(!marcadorMapasSeleccionado);
                        }}>
                        <div className="menuItemContent" style={{display : "flex"}}>
                            {mapsLoading && <SidebarLoadingItem/>}
                            Ver mapas
                        </div>
                    </MenuItem>
                    <MenuItem  data-testid = "sidebarAddMap" className='subMenuItem'
                        icon={<AddCircleIcon />} 
                        onClick={() =>{
                                setMarcadorFriendsSeleccionado(false);
                                setMarcadorPuntosSeleccionado(false);
                                setMarcadorMapasSeleccionado(false);
                                setMarcadorAñadirAmigoSeleccionado(false);
                                setMarcadorFiltroSeleccionado(false);
                            setMarcadorAboutSeleccionado(false);
                            setMarcadorAñadirMapaSeleccionado(!marcadorAñadirMapaSeleccionado); }}>
                                Añadir mapa
                        </MenuItem>
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
                            setMarcadorAboutSeleccionado(false);
                            setMarcadorFriendsSeleccionado(!marcadorFriendsSeleccionado);
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div className="menuItemContent" style={{display : isOpen? "flex" : "none"}}>
                        {friendsLoading && <SidebarLoadingItem/>}
                        Amigos
                    </div>
                </MenuItem>
                <MenuItem data-testid = "sidebarAddFriend" className='menuItem'
                        icon={<GroupIcon />} 
                        onClick={() =>{
                                setMarcadorFriendsSeleccionado(false);
                                setMarcadorPuntosSeleccionado(false);
                                setMarcadorMapasSeleccionado(false);
                                setMarcadorAñadirMapaSeleccionado(false);
                                setMarcadorFiltroSeleccionado(false);
                            setMarcadorAboutSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(!marcadorAñadirAmigoSeleccionado);
                            }}>
                        <div style={{display : isOpen? "block" : "none"}}>Añadir Amigo</div>
                </MenuItem>
                <MenuItem  data-testid = "sidebarAbout" className='menuItem' 
                    icon={<InfoIcon />} onClick={() => { 
                        if(isOpen){
                            setMarcadorPuntosSeleccionado(false);
                            setMarcadorMapasSeleccionado(false);
                            setMarcadorAñadirMapaSeleccionado(false);
                            setMarcadorAñadirAmigoSeleccionado(false);
                            setMarcadorFiltroSeleccionado(false);
                            setMarcadorAboutSeleccionado(!marcadorAboutSeleccionado);
                            setMarcadorFriendsSeleccionado(false);
                        }else{
                            collapseSidebar();
                            setOpen(!isOpen);
                        }
                    }}>
                    <div style={{display : isOpen? "block" : "none"}}>
                        About
                    </div>
                </MenuItem>
            </Menu>
        </Sidebar>
        </div>
    );
}

export default SideBar