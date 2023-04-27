import { render, waitFor } from "@testing-library/react";
import PointInfo from "./PointInfo";

test('check that the login form renders propertly', async () => {

    const {getByTestId} = await render(<PointInfo pointId={"pointId"} marker={{}} map={{}} mapId={1} webId={"https://uo276467.inrupt.net/profile/card#me"}
                                                session={{}} isOwner={true} isLoading={false}/>);

    await waitFor(() => {
        expect(getByTestId("generalViewRender")).toBeInTheDocument();
    //     getByTestId("reviewsButton").click();
    //     getByTestId("generalViewButton").click();
    //     getByTestId("commentsButton").click();
    })

});