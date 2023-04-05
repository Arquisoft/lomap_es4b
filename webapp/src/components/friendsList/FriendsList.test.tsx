import { render } from "@testing-library/react";
import FriendsList from "./FriendsList";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<FriendsList session={[]} webId={""}/>);
    expect(getByText("a")).toBeInTheDocument();
});