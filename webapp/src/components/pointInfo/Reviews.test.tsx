import { render } from "@testing-library/react";
import Reviews from "./Reviews";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<Reviews />);
    expect(getByText("a")).toBeInTheDocument();
});