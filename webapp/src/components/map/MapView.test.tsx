import { render } from "@testing-library/react";
import MapView from "./MapView.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<MapView session={[]} webId={""}/>);
    expect(getByText("Editar Punto")).toBeInTheDocument();
});