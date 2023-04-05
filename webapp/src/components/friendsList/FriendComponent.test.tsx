import { render } from "@testing-library/react";
import FriendComponent from "./FriendComponent";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<FriendComponent friendUrl ={"a"} friendName = "g" session={[]} webId={""}/>);
    expect(getByText("Selecciona un Mapa")).toBeInTheDocument();
});