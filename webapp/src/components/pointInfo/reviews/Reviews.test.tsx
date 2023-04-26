import { render ,fireEvent} from "@testing-library/react";
import Reviews from "./Reviews";

test('check that the reviews components with 0 comments renders propertly', async () => {
    const {getByText} = await render(<Reviews reviews={[]} updateReviews={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    expect(getByText("Aún no hay reseñas de este punto.")).toBeInTheDocument();
});

test('check that ypu can add a review', async () => {
    const {getByTestId} = await render(<Reviews reviews={[{"author":"User","score":4,"date":"26/4/2023"}]} updateReviews={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    getByTestId("reviewsSubmit").click();
});

