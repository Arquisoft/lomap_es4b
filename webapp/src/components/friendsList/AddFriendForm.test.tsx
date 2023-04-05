import { render } from "@testing-library/react";
import AddFriendForm from "./AddFriendForm";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<AddFriendForm session={[]} webId={""}/>);
    expect(getByText("Agregar Amigo")).toBeInTheDocument();
});