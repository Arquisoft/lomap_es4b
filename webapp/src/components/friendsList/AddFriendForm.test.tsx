import { render,fireEvent } from "@testing-library/react";
import AddFriendForm from "./AddFriendForm";

test('check that the AddFriendComponent page renders properly', async () => {

    const {getByTestId} = await render(<AddFriendForm session={[]} webId={"https://uo276467.inrupt.net/profile/card#me"} setMarcadorAñadirAmigoSeleccionado={()=>{}}/>);
    expect(getByTestId("nombreAmigo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigo")).toBeVisible();
    getByTestId("nombreAmigo").nodeValue = "amigoPrueba";
    expect(getByTestId("botonAmigo")).toBeInTheDocument();
    expect(getByTestId("botonAmigo")).toBeVisible();
    const friendName = getByTestId("nombreAmigo"); 
    fireEvent.change(friendName, { target: { value: 'friend' } });
    //getByTestId("botonAmigo").click();
});