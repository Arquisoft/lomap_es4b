import { render } from "@testing-library/react";
import Markerslist from "./Markerslist.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<Markerslist session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByText("Editar Punto")).toBeInTheDocument();
});