import { render } from "@testing-library/react";
import AddPointForm from "./AddPointForm";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<AddPointForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}
        position={10} map={[]} mapId={1} markers={[]}
        popup={{}}/>);
    expect(getByText("Agregar Punto")).toBeInTheDocument();
});