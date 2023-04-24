import {Menu, MenuItem, ProSidebar, ProSidebarProvider, Sidebar, SubMenu, useProSidebar} from "react-pro-sidebar";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MapIcon from "@mui/icons-material/Map";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import SideBar from "./SideBar";

export const SideBarConProviderSOLOPARATESTS = () => {


    return(
       <ProSidebarProvider>
           <SideBar  session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
                     marcadorPuntosSeleccionado={()=>{}} setMarcadorPuntosSeleccionado={()=>{}}
                     marcadorMapasSeleccionado={()=>{} } setMarcadorMapasSeleccionado={()=>{}}
                     marcadorFriendsSeleccionado={()=>{} } setMarcadorFriendsSeleccionado={()=>{}}
                     marcadorAñadirMapaSeleccionado={()=>{}} setMarcadorAñadirMapaSeleccionado={()=>{}}
                     marcadorAñadirAmigoSeleccionado={()=>{}} setMarcadorAñadirAmigoSeleccionado={()=>{}}
                     marcadorFiltroSeleccionado={()=>{}} setMarcadorFiltroSeleccionado={()=>{}}
                     marcadorAboutSeleccionado={()=>{}} setMarcadorAboutSeleccionado={()=>{}}></SideBar>
       </ProSidebarProvider>
    );
}

export default SideBarConProviderSOLOPARATESTS