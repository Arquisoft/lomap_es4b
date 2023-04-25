import { render } from "@testing-library/react";
import FriendComponent from "./FriendComponent";
import React from "react";
import FriendsList from "./FriendsList";

test('check that the FriendComponent renders properly', async () => {
    const {getByTestId} = await render( <FriendsList setFriendsLoading={()=>{}}
                                                     showFriendPoints={()=>{}}
                                                     setCurrentMapId={()=>{}}
                                                     session={[]}
                                                     webId={"https://uo281835.inrupt.net/profile/card#me"}></FriendsList>
    );
    expect(getByTestId("nombreAmigoP")).toBeInTheDocument();
    expect(getByTestId("nombreAmigoP")).toBeVisible();
});