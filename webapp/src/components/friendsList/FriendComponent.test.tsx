import { render } from "@testing-library/react";
import { useState, useEffect} from "react";
import FriendComponent from "./FriendComponent";
//import ReactDOM from 'react-dom/client';
import React from "react"; 

test('check that the FriendComponent renders properly', async () => {
    const {getByTestId} =  await render(<FriendComponent  showFriendPoints={() => {}} friendURL={"https://uo281835.inrupt.net/profile/card#me"} friendName={'Usuario'} session={[]}/>);
    expect(getByTestId("nombreAmigoParrafo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigoParrafo")).toBeVisible();
    expect(getByTestId("botonFriendComponent")).toBeInTheDocument();
    expect(getByTestId("botonFriendComponent")).toBeVisible();
});


test('check that the FriendComponent renders properly', async () => {
    const {getByTestId, container} = await render(<FriendComponent  showFriendPoints={() => {}} friendURL={"https://uo281835.inrupt.net/profile/card#me"} friendName={'Usuario'} session={[]}/>);
    getByTestId("botonFriendComponent").click();
});