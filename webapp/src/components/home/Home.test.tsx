import { render } from "@testing-library/react";
import Home from "./pages/Home";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<Home />);
    expect(getByTestId("section")).toBeInTheDocument();
    expect(getByTestId("section")).toBeVisible();
});