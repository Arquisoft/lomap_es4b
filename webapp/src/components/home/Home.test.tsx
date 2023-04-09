import { render } from "@testing-library/react";
import Home from "./pages/Home";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<Home />);
    const {getByTestId} = render(<Home />);
    expect(getByTestId("section")).toBeInTheDocument();
    expect(getByTestId("section")).toBeVisible();
});