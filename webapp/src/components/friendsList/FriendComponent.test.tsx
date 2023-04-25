import { render } from "@testing-library/react";
import FriendComponent from "./FriendComponent";
import React from "react";

test('check that the FriendComponent renders properly', async () => {
    const {getByTestId} = await render(<FriendComponent showFriendPoints={() => {}} friendURL={"https://uo281835.inrupt.net/profile/card#me"} friendName={"item.friendName"} setCurrentMapId={()=>{}} session={[]} key={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("nombreAmigoParrafo")).toBeInTheDocument();
    expect(getByTestId("nombreAmigoParrafo")).toBeVisible();
    expect(getByTestId("selectFriendComponent")).toBeInTheDocument();
    expect(getByTestId("selectFriendComponent")).toBeVisible();
    getByTestId("selectFriendComponent").click();
    expect(getByTestId("botonFriendComponent")).toBeInTheDocument();
    expect(getByTestId("botonFriendComponent")).toBeVisible();
    getByTestId("botonFriendComponent").click();
});