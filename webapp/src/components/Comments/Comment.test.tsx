import { render } from "@testing-library/react";
import Comment from "./Comment";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<Comment username={"a"} text={"a"}/>);
    expect(getByText("a")).toBeInTheDocument();
  });