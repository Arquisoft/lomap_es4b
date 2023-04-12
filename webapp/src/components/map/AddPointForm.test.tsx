import { render } from "@testing-library/react";
import AddPointForm from "./AddPointForm";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<AddPointForm session={[]} webId={""}/>);
    expect(getByText("Agregar Punto")).toBeInTheDocument();
});