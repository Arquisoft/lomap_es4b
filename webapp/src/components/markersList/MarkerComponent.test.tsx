import { render } from "@testing-library/react";
import MarkerComponent from "./MarkerComponent.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<MarkerComponent session={[]} webId={""}/>);
    expect(getByText("Imagen del Punto")).toBeInTheDocument();
});