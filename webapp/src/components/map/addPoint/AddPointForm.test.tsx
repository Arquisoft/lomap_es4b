import { render, waitFor, fireEvent} from "@testing-library/react";
import AddPointForm from "./AddPointForm";
import { useSession } from "@inrupt/solid-ui-react";
import ProfileViewer from "../../profileviewer/ProfileViewer";

test('check that the add point form renders propertly', async () => {
    const {getByText} = await render(<AddPointForm webId={"https://uo276467.inrupt.net/profile/card#me"}
        position={10} map={[]} mapId={1} markers={[]}
        popup={{}}/>);

    expect(getByText("Añadir Punto")).toBeInTheDocument();
    expect(getByText("Selecciona una categoría:")).toBeInTheDocument();
    expect(getByText("Descripción:")).toBeInTheDocument();
    expect(getByText("Agregar Punto")).toBeInTheDocument();
});

test('check that the add point form can be filled', async () => {
    const {getByLabelText} = await render(<AddPointForm webId={"https://uo276467.inrupt.net/profile/card#me"}
        position={10} map={[]} mapId={1} markers={[]}
        popup={{}}/>);

    const titleInput = getByLabelText("Título:");
    fireEvent.change(titleInput, { target: { value: 'Punto unit test' } });
    const descriptionInput = getByLabelText("Descripción:");
    fireEvent.change(descriptionInput, { target: { value: 'Descripción unit test' } });

    // fireEvent.click(screen.getByText("Agregar Punto"));

    // waitFor(() => {
    //   expect(
    //     screen.getByText("Creando")
    //   ).toBeInTheDocument();
    // });
});