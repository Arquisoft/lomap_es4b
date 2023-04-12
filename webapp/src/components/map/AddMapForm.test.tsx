import { render } from "@testing-library/react";
import AddMapForm from "./AddMapForm";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<AddMapForm session={[]} webId={""}/>);
    expect(getByText("Agregar Mapa")).toBeInTheDocument();
});