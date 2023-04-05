import { render } from "@testing-library/react";
import ProfileViewer from "./ProfileViewer";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<ProfileViewer />);
    expect(getByText("a")).toBeInTheDocument();
});