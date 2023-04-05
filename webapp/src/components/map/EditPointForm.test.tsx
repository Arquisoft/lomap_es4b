import { render } from "@testing-library/react";
import EditPointForm from "./EditPointForm.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<EditPointForm session={[]} webId={""}/>);
    expect(getByText("Editar Punto")).toBeInTheDocument();
});