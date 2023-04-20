import { render } from "@testing-library/react";
import MapListComponent from "./MapListComponent.js";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = render(<MapListComponent session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("Imagen")).toBeInTheDocument();
});