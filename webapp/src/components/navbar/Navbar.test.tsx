import { render } from "@testing-library/react";
import Navbar from "./Navbar.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<Navbar session={[]} webId={""}/>);
    expect(getByText("Login")).toBeInTheDocument();
});