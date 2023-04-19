import { render } from "@testing-library/react";
import MarkerComponent from "./MarkerComponent.js";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<MarkerComponent session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("Imagen del Punto.")).toBeInTheDocument();
});