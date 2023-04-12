import { render } from "@testing-library/react";
import MapList from "./MapList.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<MapList session={[]} webId={""}/>);
    expect(getByText("Mapas")).toBeInTheDocument();
});