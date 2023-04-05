import { render } from "@testing-library/react";
import FilterForm from "./FilterForm";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<FilterForm session={[]} webId={""}/>);
    expect(getByText("Monumento")).toBeInTheDocument();
});