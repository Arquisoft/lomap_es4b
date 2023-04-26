import {getByDisplayValue, getByRole, render} from "@testing-library/react";
import Filtro from "./Filtro";

test('check that the filter shows properly', async () => {
    const {getByTestId} =  render(<Filtro  showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByTestId("tituloFiltro")).toBeInTheDocument();
    expect(getByTestId("monument")).toBeInTheDocument();
    expect(getByTestId("restaurant")).toBeInTheDocument();
    expect(getByTestId("hospital")).toBeInTheDocument();
});
test('check that the monument filter can be selected properly', async () => {
    const {getByTestId,container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("monument").click();
});
test('check that the hospital filter can be selected properly', async () => {
    const {getByTestId, container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("hospital").click();
});
test('check that the restaurant filter can be selected properly', async () => {
    const {getByTestId,container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("restaurant").click();
});
test('check that the button can be clicked properly', async () => {
    const {getByTestId, container} =  render(<Filtro showFilteredPoints={() => {}} mapId={1}session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByTestId("hospital").click();
    // getByTestId("filtrar").click();
});