import { render } from "@testing-library/react";
import SideBar from "./SideBar";
import sideBar from "./SideBar";
import {ProSidebarProvider} from "react-pro-sidebar";
import SideBarConProviderSOLOPARATESTS from "./SideBarConProviderSOLOPARATESTS";

test('check that the sidebar renders propertly', async () => {


    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("sidebarMenu")).toBeInTheDocument();
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    expect(getByTestId("sidebarAddFriend")).toBeInTheDocument();
    expect(getByTestId("sidebarAbout")).toBeInTheDocument();

});

test('check that the sidebar point section can be clicked propertly', async () => {
    
    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarPoints").click();
    getByTestId("sidebarViewPoints").click();  
    getByTestId("sidebarViewPoints").click();  
    getByTestId("sidebarFilterPoints").click();     
    getByTestId("sidebarFilterPoints").click();     
    getByTestId("sidebarPoints").click();
    getByTestId("sidebarPoints").click();

});

test('check that the sidebar first section can be clicked propertly', async () => {

    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFirst").click();
});

test('check that the sidebar map section can be clicked propertly', async () => {

    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarMapas").click();
    getByTestId("sidebarViewMaps").click();
    getByTestId("sidebarViewMaps").click();
    getByTestId("sidebarAddMap").click();
    getByTestId("sidebarAddMap").click();
    getByTestId("sidebarMapas").click();

});

test('check that the sidebar friends section can be clicked propertly', async () => {

    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFriends").click();
    getByTestId("sidebarFriends").click();
    getByTestId("sidebarAddFriend").click();
    getByTestId("sidebarAddFriend").click();

});

test('check that the about section can be clicked propertly', async () => {

    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebarAbout")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarAbout").click();
    getByTestId("sidebarAbout").click();

});
