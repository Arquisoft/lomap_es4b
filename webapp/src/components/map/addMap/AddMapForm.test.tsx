import { render } from "@testing-library/react";
import AddMapForm from "./AddMapForm";
test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<AddMapForm session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"} setMarcadorAñadirMapaSeleccionado={()=>{}}/>);
    //expect(getByText("Agregar Mapa")).toBeInTheDocument();
    getByTestId("addMapButton").click();
});