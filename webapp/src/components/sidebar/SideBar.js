
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
import { updatePoints,filterPoints,deletePoints,friendsAclPermission} from '../../helper/PodHelper';

import "./SideBar.css"
import {Filtro} from "./Filtro/Filtro";

export const SideBar = (props) => {

    const { collapseSidebar } = useProSidebar();
    const {session, webId, marcadorSeleccionado,setMarcadorSeleccionado} = props;
    const [isOpen, setOpen] = useState(true);


    // return(
    //     <Sidebar className="sideBar">
            
    //         <Menu className='menu'>

    //             <MenuItem className='menuItem'
    //                 icon={<MenuIcon />}
    //                 onClick={() => {
    //                 collapseSidebar();
    //                 }}
    //                 style={{ textAlign: "center" }}
    //                 >
    //                 {" "}
    //             </MenuItem>

    //             <SubMenu className="subMenu" label="Gestionar puntos" icon={<SortIcon />}>
    //                 <MenuItem className="subMenuItem" label="Ver puntos"
    //                     icon={<FmdGoodIcon />}
    //                     onClick={()=>{
    //                         if(marcadorSeleccionado){
    //                             setMarcadorSeleccionado(false);
    //                         }else{
    //                             setMarcadorSeleccionado(true);
    //                         }
    //                     }}
    //                 > Ver puntos
    //                 </MenuItem>
    //                 <MenuItem className='subMenuItem'
    //                     icon={<AddLocationAltIcon />} 
    //                     onClick={() =>
    //                         { updatePoints(43.430423, -5.839197, "McDondals", "Restaurante de comida rápida", "Restaurante",session, webId);}}>
    //                     Añadir punto </MenuItem>
    //                 <MenuItem className='subMenuItem'
    //                     icon={<WrongLocationIcon />} 
    //                     onClick={() =>
    //                         { deletePoints(session,webId, "lv4uyijk6njok08057qg");}}> 
    //                     Eliminar punto 
    //                 </MenuItem>
    //                 <MenuItem className='subMenuItem' 
    //                     icon={<FilterAltIcon />}
    //                     onClick={ () => 
    //                         { filterPoints(session, webId,["Casa", "Resturante"]) } }> 
    //                     Filtrar puntos 
    //                 </MenuItem>

    //             </SubMenu >
                
    //             <MenuItem className='menuItem'
    //                 icon={<GroupIcon />} 
    //                 onClick={() => 
    //                     { }}> 
    //                 Amigos 
    //             </MenuItem>
    //             <MenuItem className='menuItem'
    //                 icon={<GroupIcon />} 
    //                 onClick={() => 
    //                     { friendsAclPermission(webId,session);}}> 
    //                 Dar Permisos Amigos
    //             </MenuItem>
            
    //             <MenuItem className='menuItem'
    //                 icon={<InfoIcon />} 
    //                 > About </MenuItem>
    //         </Menu>
    //     </Sidebar>
    // );

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
                            { deletePoints(session,webId, "x3jq4fsqyzlaxj2z00dj");}}> 
                        Eliminar punto </MenuItem>
                    <MenuItem className='subMenuItem' 
                        icon={<FilterAltIcon />}
                        onClick={ () => 
                            { filterPoints(session, webId,["Casa", "Resturante"]) } }> 
                        Filtrar puntos </MenuItem>
                </SubMenu >
                
                <MenuItem className='menuItem' label="Amigos"
                    icon={<GroupIcon />} 
                    onClick={() => { 
                        if(isOpen){

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
                <SubMenu className="menuFiltro" label="Filtrar puntos">
                    <MenuItem className="subMenuFiltro" label="filtros">
                        <Filtro listaFiltro={["Restaurante","Museo"]}>

                        </Filtro>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
        </div>
    );
}

export default SideBar