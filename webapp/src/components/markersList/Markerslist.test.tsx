import { render } from "@testing-library/react";
import Markerslist from "./Markerslist.js";

test('check that the login form renders propertly', async () => {


    const {getByTestId} = await render(<Markerslist setPointsLoading={() => {}} centerMap={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("sideListLocations")).toBeInTheDocument();

});