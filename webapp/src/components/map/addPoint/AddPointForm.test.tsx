import { render, waitFor } from "@testing-library/react";
import AddPointForm from "./AddPointForm";
import { useSession } from "@inrupt/solid-ui-react";
import ProfileViewer from "../../profileviewer/ProfileViewer";

// jest.mock("@inrupt/solid-ui-react", () => ({
//     useSession: () => ({
//       session: {
//         info: {
//           webId: "https://uo281835.inrupt.net/profile/card#me",
//         },
//       },
//     }),
//   }));

test('check that the login form renders propertly', async () => {
    const {getByText, getByTestId} = await render(<AddPointForm webId={"https://uo281835.inrupt.net/profile/card#me"}
        position={10} map={[]} mapId={1} markers={[]}
        popup={{}}/>);

    expect(getByText("Añadir Punto")).toBeInTheDocument();
    expect(getByText("Título:")).toBeInTheDocument();
    expect(getByText("Selecciona una categoría:")).toBeInTheDocument();
    expect(getByText("Descripción:")).toBeInTheDocument();
    expect(getByText("Agregar Punto")).toBeInTheDocument();
    // await waitFor(() => getByTestId("addPointSubmit").click());
});