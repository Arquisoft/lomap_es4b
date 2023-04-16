import { render } from "@testing-library/react";
import SideBar from "./SideBar";
import sideBar from "./SideBar";

test('check that the sidebar renders propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebar")).toBeInTheDocument();
    expect(getByTestId("sidebarMenu")).toBeInTheDocument();
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    expect(getByTestId("sidebarMapas")).toBeInTheDocument();
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
});
test('check that the sidebar point section can be clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    getByTestId("sidebarPoints").click();
});
test('check that the sidebar point section can be un clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarPoints")).toBeInTheDocument();
    getByTestId("sidebarPoints").click();
});
test('check that the sidebar first section can be clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
});
test('check that the sidebar first section can be un clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarFirst")).toBeInTheDocument();
    getByTestId("sidebarFirst").click();
    getByTestId("sidebarFirst").click();
});
test('check that the sidebar map section can be clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarMap")).toBeInTheDocument();
    getByTestId("sidebarMap").click();
});
test('check that the sidebar map section can be un clicked propertly', async () => {

    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarMap")).toBeInTheDocument();
    getByTestId("sidebarMap").click();
    getByTestId("sidebarMap").click();
});
test('check that the sidebar friends section can be clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    getByTestId("sidebarFriends").click();
});
test('check that the sidebar friends section can be un clicked propertly', async () => {
    const {getByTestId} = await render(<SideBar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sidebarFriends")).toBeInTheDocument();
    getByTestId("sidebarFriends").click();
    getByTestId("sidebarFriends").click();
});