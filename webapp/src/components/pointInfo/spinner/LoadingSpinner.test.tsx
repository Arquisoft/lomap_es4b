import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<LoadingSpinner />);
    expect(getByText("a")).toBeInTheDocument();
});