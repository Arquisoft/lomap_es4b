
import { ProSidebarProvider,Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import "./SideBar.css"

export const SideBar = () => {

    return(
        <Sidebar className="sideBar">
            <Menu className="menu">
                <SubMenu className="subMenu" label="Charts">
                    <MenuItem className='menuItem'> Pie charts </MenuItem>
                    <MenuItem className='menuItem'> Line charts </MenuItem>
                </SubMenu>
                    <MenuItem className='menuItem'> Documentation </MenuItem>
                    <MenuItem className='menuItem'> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SideBar