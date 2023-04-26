import { render, fireEvent} from "@testing-library/react";
import Comments from "./Comments";

test('check that the comments components with 0 comments renders propertly', async () => {
    const {getByText} = await render(<Comments comments={[]} updateComments={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    expect(getByText("Aún no hay comentarios en este punto.")).toBeInTheDocument();
});

test('check that the comments components with some comments renders propertly', async () => {
    const {getByText} = await render(<Comments comments={[{"author":"Usuario","comment":"comentario test","date":"26/4/2023"}]} updateComments={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    expect(getByText("Usuario (26/4/2023): comentario test")).toBeInTheDocument();
});

test('check that can add a comment renders propertly', async () => {
    const {getByTestId} = await render(<Comments comments={[]} updateComments={()=>{}}
                                               pointId={"this.state.point.id"}
                                               mapId={1}
                                               session={{}} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);

    const commentInputText = getByTestId("commentText"); 
    fireEvent.change(commentInputText, { target: { value: 'Comentario unit test' } });
    getByTestId("commentSubmit").click();

});