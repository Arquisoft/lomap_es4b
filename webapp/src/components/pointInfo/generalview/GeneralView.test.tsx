import { render } from "@testing-library/react";
import GeneralView from "./GeneralView";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<GeneralView />);
    expect(getByText("a")).toBeInTheDocument();
});