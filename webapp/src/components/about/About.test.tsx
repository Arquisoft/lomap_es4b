import { render } from "@testing-library/react";
import About from "./About";

test('check that the About page renders properly', async () => {
    const {getByTestId} = await render(<About marcadorAboutSeleccionado={true} setMarcadorAboutSeleccionado={()=>{}}/>);
    expect(getByTestId("contenedorAbout")).toBeInTheDocument();
    expect(getByTestId("contenedorAbout")).toBeVisible();
    getByTestId("contenedorAbout").onclose;
});