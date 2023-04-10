import { render } from "@testing-library/react";
import ProfileViewer from "./ProfileViewer";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = render(<ProfileViewer />);
    expect(getByTestId("sidebarProfile")).toBeInTheDocument();
    expect(getByTestId("sidebarProfile")).toBeVisible();
});