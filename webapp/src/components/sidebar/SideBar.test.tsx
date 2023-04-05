import { render } from "@testing-library/react";
import SideBar from "./SideBar";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<SideBar />);
    expect(getByText("Filtrar Puntos")).toBeInTheDocument();
});