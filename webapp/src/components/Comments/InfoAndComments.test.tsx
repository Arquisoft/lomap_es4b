import { render } from "@testing-library/react";
import InfoAndComments from "./InfoAndComments";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<InfoAndComments/>);
    expect(getByText("a")).toBeInTheDocument();
  });