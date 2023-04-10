import { render } from "@testing-library/react";
import Markerslist from "./Markerslist.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<Markerslist session={[]} webId={""}/>);
    expect(getByText("Editar Punto")).toBeInTheDocument();
});