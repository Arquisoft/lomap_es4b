import { render } from "@testing-library/react";
import FriendsList from "./FriendsList";

test('check that the login form renders propertly', async () => {
    const {getByText} = await render(<FriendsList session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    const {getAllByTestId} = await render(<FriendsList session={[]} webId={"https://uo281835.inrupt.net/profile/card#me"}/>);
    expect(getAllByTestId("nombreAmigoP")).toBeInTheDocument();
    expect(getAllByTestId("nombreAmigoP")).toBeVisible();
});