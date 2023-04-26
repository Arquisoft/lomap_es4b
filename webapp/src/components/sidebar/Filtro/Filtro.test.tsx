import {getByDisplayValue, getByRole, render} from "@testing-library/react";
import Filtro from "./Filtro";

test('check that the filter shows properly', async () => {
    const {getByTestId} =  render(<Filtro  showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("tituloFiltro")).toBeInTheDocument();
    expect(getByTestId("monument")).toBeInTheDocument();
    expect(getByTestId("restaurant")).toBeInTheDocument();
    expect(getByTestId("hospital")).toBeInTheDocument();
    expect(getByTestId("filtrarTodo")).toBeInTheDocument();
});
test('check that the monument filter can be selected properly', async () => {
    const {getByTestId,getByText,container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("monument").click();
    //Desmarcar checkbox
    getByTestId("monument").click();
    getByTestId("filtrar").click();
    expect(getByText("Filtrando")).toBeInTheDocument();
});
test('check that the Mostrar Todo button can be clicked properly', async () => {
    const {getByTestId,getByText,container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("filtrarTodo").click();
    expect(getByText("Mostrando")).toBeInTheDocument();
});
