import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<LoadingSpinner />);
    expect(getByTestId("spinner-container")).toBeInTheDocument();
});