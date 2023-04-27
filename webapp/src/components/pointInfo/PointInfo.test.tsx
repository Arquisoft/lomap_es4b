import { render } from "@testing-library/react";
import PointInfo from "./PointInfo";

test('check that the login form renders propertly', async () => {

    const {getByText} = await render(<PointInfo pointId={"pointId"} marker={{}} map={{}} mapId={1} webId={"https://uo276467.inrupt.net/profile/card#me"}
                                                session={{}} isOwner={true}/>);

});