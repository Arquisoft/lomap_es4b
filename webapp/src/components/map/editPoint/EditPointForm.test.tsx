import { render,fireEvent } from "@testing-library/react";
import EditPointForm from "./EditPointForm.js";

test('check that the editPointForm form renders propertly', async () => {
    const {getByText} = await render(<EditPointForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
    name={"point.name"} description={"point.description"} category={"point.category"} pointId={"pointId"} latLng={{latitude:1, longitude:3}}
     map={{}} mapId={1} popup={{}} marker={{}} />);
    expect(getByText("Edicion de Punto")).toBeInTheDocument();
    expect(getByText("Selecciona una categoría:")).toBeInTheDocument();
    expect(getByText("Descripción:")).toBeInTheDocument();
    expect(getByText("Editar Punto")).toBeInTheDocument(); 
});

test('check that the editPointForm can be filled', async () => {
    const {getByTestId,getByText} = await render(<EditPointForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
    name={"point.name"} description={"point.description"} category={"point.category"} pointId={"pointId"} latLng={{latitude:1, longitude:3}}
     map={{}} mapId={1} popup={{}} marker={{}} />);

    const titleInput = getByTestId("editPointTitle");
    fireEvent.change(titleInput, { target: { value: 'Punto unit test' } });
    const descriptionInput = getByTestId("editPointDescription");
    fireEvent.change(descriptionInput, { target: { value: 'Descripción unit test' } });
    // getByTestId("editPointSubmit").click();
    // expect(getByText("Editando")).toBeInTheDocument();

});