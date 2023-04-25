import { render } from "@testing-library/react";
import AddFriendForm from "./AddFriendForm";

test('check that the About page renders properly', async () => {
    const {getByTestId} = await render(<AddFriendForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"} setMarcadorAñadirAmigoSeleccionado={()=>{}}/>);
    expect(getByTestId("nombreAmigo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigo")).toBeVisible();
    getByTestId("nombreAmigo").nodeValue = "amigoPrueba"
    expect(getByTestId("botonAmigo")).toBeInTheDocument();
    expect(getByTestId("botonAmigo")).toBeVisible();
    getByTestId("botonAmigo").click();
});