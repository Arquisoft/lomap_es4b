import { render } from "@testing-library/react";
import EditPointForm from "./EditPointForm.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<EditPointForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
    name={"point.name"} description={"point.description"} category={"point.category"} pointId={"pointId"} latLng={{latitude:1, longitude:3}}
     map={{}} mapId={1} popup={{}} marker={{}} />);
    expect(getByText("Editar Punto")).toBeInTheDocument();
});