import { render } from "@testing-library/react";
import SideBarConProviderSOLOPARATESTS from "./SideBarConProviderSOLOPARATESTS";

test('check that the sidebar renders and functions propertly', async () => {

    const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("sidebarMenu")).toBeInTheDocument();
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    expect(getByTestId("sidebarAddFriend")).toBeInTheDocument();
    expect(getByTestId("sidebarAbout")).toBeInTheDocument();

    //Botón superior
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFirst").click();

    //Puntos
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarPoints").click();
    getByTestId("sidebarViewPoints").click();  
    getByTestId("sidebarViewPoints").click();  
    getByTestId("sidebarFilterPoints").click();     
    getByTestId("sidebarFilterPoints").click();     
    getByTestId("sidebarPoints").click();
    getByTestId("sidebarPoints").click();

    //Mapas
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarMapas").click();
    getByTestId("sidebarViewMaps").click();
    getByTestId("sidebarViewMaps").click();
    getByTestId("sidebarAddMap").click();
    getByTestId("sidebarAddMap").click();
    getByTestId("sidebarMapas").click();

    //Amigos
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFriends").click();
    getByTestId("sidebarFriends").click();
    getByTestId("sidebarAddFriend").click();
    getByTestId("sidebarAddFriend").click();

    //About
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarAbout").click();
    getByTestId("sidebarAbout").click();

});

// test('check that the sidebar point section can be clicked propertly', async () => {
    
//     const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
//     expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    

// });

// test('check that the sidebar first section can be clicked propertly', async () => {

//     const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
//     expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    
// });

// test('check that the sidebar map section can be clicked propertly', async () => {

//     const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
//     expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    

// });

// test('check that the sidebar friends section can be clicked propertly', async () => {

//     const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
//     expect(getByTestId("sidebarFriends")).toBeInTheDocument();

// });

// test('check that the about section can be clicked propertly', async () => {

//     const {getByTestId} = await render(<SideBarConProviderSOLOPARATESTS/>);
//     expect(getByTestId("sidebarAbout")).toBeInTheDocument();

// });
