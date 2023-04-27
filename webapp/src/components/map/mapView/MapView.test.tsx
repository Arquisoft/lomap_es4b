import { render,fireEvent } from "@testing-library/react";
import MapView from "./MapView";

test('check that the AddFriendComponent page renders properly', async () => {

     const {getByTestId, container} = await render(<MapView session={[]} webId={"https://uo276467.inrupt.net/profile/card#me"} ref={()=>{}}
         setCurrentMapId={() => {}} setCurrentMapWebId={() => {}} isLogged={true}/>);
});