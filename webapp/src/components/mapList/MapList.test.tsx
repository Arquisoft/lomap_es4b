import { render } from "@testing-library/react";
import MapList from "./MapList.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<MapList session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByText("Mapas")).toBeInTheDocument();
});