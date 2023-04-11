import { render } from "@testing-library/react";
import MapListComponent from "./MapListComponent.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<MapListComponent session={[]} webId={""}/>);
    expect(getByText("Imagen")).toBeInTheDocument();
});