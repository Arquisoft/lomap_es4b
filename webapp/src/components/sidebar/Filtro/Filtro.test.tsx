import {getByDisplayValue, getByRole, render} from "@testing-library/react";
import Filtro from "./Filtro";

test('check that the filter shows properly', async () => {
    const {getByText} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {container} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByText("Seleccione las categorías a filtrar")).toBeInTheDocument();
    expect(getByText("Monumento")).toBeInTheDocument();
    expect(getByText("Restaurante")).toBeInTheDocument();
    expect(getByText("Hospital")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('filtro');
    expect(getByDisplayValue(container,"monument")).toBeInTheDocument();
    expect(getByDisplayValue(container,"hospital")).toBeInTheDocument();
    expect(getByDisplayValue(container,"restaurant")).toBeInTheDocument();
});
test('check that the monument filter can be selected properly', async () => {
    const {getByText} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {container} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByDisplayValue(container,"monument").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["monument"]);
});
test('check that the hospital filter can be selected properly', async () => {
    const {getByText} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {container} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByDisplayValue(container,"hospital").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["hospital"]);
});
test('check that the restaurant filter can be selected properly', async () => {
    const {getByText} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {container} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByText("Restaurante").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["restaurant"]);
});
test('check that the button can be clicked properly', async () => {
    const {getByText} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {container} = await render(<Filtro session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    getByText("Hospital").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["hospital"]);
    getByText("Filtrar").click();
});