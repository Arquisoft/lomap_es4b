import { render } from "@testing-library/react";
import MapListComponent from "./MapListComponent.js";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<MapListComponent mapId={'1'} setCurrentMapId={() => {}} session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
                        showMapPoints={() => {}}
                        />);
    getByTestId("mapComponentSubmit").click(); 
});