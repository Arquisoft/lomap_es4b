import { render } from "@testing-library/react";
import MapList from "./MapList.js";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<MapList setMapsLoading={() => {}} session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("scrollAreaMaps")).toBeInTheDocument();

});