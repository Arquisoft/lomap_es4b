import { render,fireEvent } from "@testing-library/react";
import AddFriendForm from "./AddFriendForm";
// @ts-ignore
import { SolidNodeClient } from 'solid-node-client';

test('check that the AddFriendComponent page renders properly', async () => {
    const client = new SolidNodeClient({
        appUrl : "localhost:3000",
      });

    const session = await client.login({
        idp : "https://solidcommunity.net/",
        username : "uo276467",
        password : "e2ff3d361A_",
      });

    const {getByTestId} = await render(<AddFriendForm session={session} webId={"https://uo276467.inrupt.net/profile/card#me"} setMarcadorAñadirAmigoSeleccionado={()=>{}}/>);
    expect(getByTestId("nombreAmigo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigo")).toBeVisible();
    getByTestId("nombreAmigo").nodeValue = "amigoPrueba";
    expect(getByTestId("botonAmigo")).toBeInTheDocument();
    expect(getByTestId("botonAmigo")).toBeVisible();
    const friendName = getByTestId("nombreAmigo"); 
    fireEvent.change(friendName, { target: { value: 'friend' } });
    getByTestId("botonAmigo").click();
});