import { render } from "@testing-library/react";
import { useState, useEffect} from "react";
import FriendComponent from "./FriendComponent";
import React from "react";
import {act} from "react-dom/test-utils";
import ProfileViewer from "../profileviewer/ProfileViewer";
import { ProSidebarProvider } from "react-pro-sidebar";
import {useSession} from "@inrupt/solid-ui-react";


test('check that the FriendComponent renders properly', async () => {

    //const {session}= useSession()
    const {getByTestId} = await render(<FriendComponent  friendURL={"https://uo281835.inrupt.net/profile/card#me"}
                                                         friendName={"item.friendName"}
                                                         setCurrentMapId={()=>{}} session={[]} key={"https://uo281835.inrupt.net/profile/card#me"}/>);

    expect(getByTestId("nombreAmigoParrafo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigoParrafo")).toBeVisible();
    expect(getByTestId("botonFriendComponent")).toBeInTheDocument();
    expect(getByTestId("botonFriendComponent")).toBeVisible();
});
