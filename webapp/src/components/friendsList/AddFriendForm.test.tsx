import { render } from "@testing-library/react";
import AddFriendForm from "./AddFriendForm";

test('check that the add friend form renders propertly', async () => {
    const {getByTestId} = await render(<AddFriendForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    /*expect(getByText("Agregar Amigo")).toBeInTheDocument();
    expect(getByText("Agregar Amigo")).toBeVisible();
    expect(getByText("Introduce el nombre")).toBeInTheDocument();
    expect(getByText("Introduce el nombre")).toBeVisible();*/
    expect(getByTestId("nombreAmigo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigo")).toBeVisible();
    expect(getByTestId("botonAmigo")).toBeInTheDocument();
    expect(getByTestId("botonAmigo")).toBeVisible();
});
test('check that the add friend button can be clicked properly', async () => {
    const {getByTestId} = await render(<AddFriendForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    /*expect(getByText("Agregar Amigo")).toBeInTheDocument();
    expect(getByText("Agregar Amigo")).toBeVisible();
    expect(getByText("Introduce el nombre")).toBeInTheDocument();
    expect(getByText("Introduce el nombre")).toBeVisible();*/
    expect(getByTestId("nombreAmigo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigo")).toBeVisible();
    (getByTestId("nombreAmigo")).nodeValue="uo281835";
    expect(getByTestId("botonAmigo")).toBeInTheDocument();
    expect(getByTestId("botonAmigo")).toBeVisible();
    (getByTestId("botonAmigo")).click();
});