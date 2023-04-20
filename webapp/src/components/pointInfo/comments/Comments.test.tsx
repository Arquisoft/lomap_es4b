import { render } from "@testing-library/react";
import Comments from "./Comments";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<Comments comments={[]} updateComments={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    expect(getByText("Aún no hay comentarios en este punto.")).toBeInTheDocument();
});