import { render } from "@testing-library/react";
import Navbar from "./Navbar.js";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<Navbar session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getByText("Login")).toBeInTheDocument();
});