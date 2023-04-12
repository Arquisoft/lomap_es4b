import {getByDisplayValue, getByRole, render} from "@testing-library/react";
import Filtro from "./Filtro";

test('check that the filter shows properly', async () => {
    const {getByText} = render(<Filtro session={[]} webId={""}/>);
    const {container} = render(<Filtro session={[]} webId={""}/>);
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
    const {getByText} = render(<Filtro session={[]} webId={""}/>);
    const {container} = render(<Filtro session={[]} webId={""}/>);
    getByDisplayValue(container,"monument").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["monument"]);
});
test('check that the hospital filter can be selected properly', async () => {
    const {getByText} = render(<Filtro session={[]} webId={""}/>);
    const {container} = render(<Filtro session={[]} webId={""}/>);
    getByDisplayValue(container,"hospital").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["hospital"]);
});
test('check that the restaurant filter can be selected properly', async () => {
    const {getByText} = render(<Filtro session={[]} webId={""}/>);
    const {container} = render(<Filtro session={[]} webId={""}/>);
    getByText("Restaurante").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["restaurant"]);
});
test('check that the button can be clicked properly', async () => {
    const {getByText} = render(<Filtro session={[]} webId={""}/>);
    const {container} = render(<Filtro session={[]} webId={""}/>);
    getByText("Hospital").click();
    expect((container)).toHaveAttribute("listaCosasFiltradas", ["hospital"]);
    getByText("Filtrar").click();
});