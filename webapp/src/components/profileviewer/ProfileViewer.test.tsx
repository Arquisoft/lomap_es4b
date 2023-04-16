import { render } from "@testing-library/react";
import ProfileViewer from "./ProfileViewer";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<ProfileViewer />);
    expect(getByTestId("sidebarProfile")).toBeInTheDocument();
    expect(getByTestId("sidebarProfile")).toBeVisible();
});