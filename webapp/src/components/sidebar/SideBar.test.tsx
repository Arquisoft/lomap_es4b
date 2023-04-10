import { render } from "@testing-library/react";
import SideBar from "./SideBar";
import sideBar from "./SideBar";

test('check that the sidebar renders propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("sidebarMenu")).toBeInTheDocument();
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    expect(getByText("Ver puntos")).toBeInTheDocument();
    expect(getByText("Filtrar puntos")).toBeInTheDocument();
    expect(getByText("Ver mapas")).toBeInTheDocument();
    expect(getByText("Añadir mapa")).toBeInTheDocument();
    expect(getByText("Añadir Amigo")).toBeInTheDocument();
});
test('check that the sidebar point section can be clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    getByTestId("sidebarPoints").click();
    expect(getByText("Ver puntos")).toBeVisible();
    expect(getByText("Filtrar puntos")).toBeVisible();
});
test('check that the sidebar point section can be un clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    getByTestId("sidebarPoints").click();
    expect(getByText("Ver puntos")).toBeVisible();
    expect(getByText("Filtrar puntos")).toBeVisible();
    getByTestId("sidebarPoints").click();
    expect(getByText("Ver puntos")).not.toBeVisible();
    expect(getByText("Filtrar puntos")).not.toBeVisible();
});
test('check that the sidebar first section can be clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
});
test('check that the sidebar first section can be un clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFirst").click();
});
test('check that the sidebar map section can be clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarMap")).toBeInTheDocument();
    getByTestId("sidebarMap").click();
    expect(getByText("Ver mapas")).toBeVisible();
    expect(getByText("Añadir mapa")).toBeVisible();
});
test('check that the sidebar map section can be un clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarMap")).toBeInTheDocument();
    getByTestId("sidebarMap").click();
    expect(getByText("Ver mapas")).toBeVisible();
    expect(getByText("Añadir mapa")).toBeVisible();
    getByTestId("sidebarMap").click();
    expect(getByText("Ver mapas")).not.toBeVisible();
    expect(getByText("Añadir mapa")).not.toBeVisible();
});
test('check that the sidebar friends section can be clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    getByTestId("sidebarFriends").click();
    expect(getByText("Añadir amigo")).toBeVisible();
});
test('check that the sidebar friends section can be un clicked propertly', async () => {
    const {getByText} = render(<SideBar session={[]} webId={""}/>);
    const {getByTestId} = render(<SideBar session={[]} webId={""}/>);
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    getByTestId("sidebarFriends").click();
    expect(getByText("Añadir amigo")).toBeVisible();
    getByTestId("sidebarFriends").click();
    expect(getByText("Añadir amigo")).not.toBeVisible();
});