import { render } from "@testing-library/react";
import FriendComponent from "./FriendComponent";

test('check that the Friend component renders properly', async () => {
    const {getByText} = render(<FriendComponent friendUrl ={"a"} friendName = "g" session={[]} webId={""}/>);
    const {getByTestId} = render(<FriendComponent friendUrl ={"a"} friendName = "g" session={[]} webId={""}/>);
    expect(getByTestId("nombreAmigoP")).toBeInTheDocument();
    expect(getByTestId("nombreAmigoP")).toBeVisible();
    expect(getByText("g")).toBeInTheDocument();
    expect(getByText("g")).toBeVisible();
    expect(getByText("Selecciona un Mapa")).toBeInTheDocument();
    expect(getByText("Selecciona un Mapa")).toBeVisible();
    expect(getByText("Cargar Mapa")).toBeInTheDocument();
    expect(getByText("Cargar Mapa")).toBeVisible();
});