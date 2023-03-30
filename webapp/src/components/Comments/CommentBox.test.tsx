import { render } from "@testing-library/react";
import CommentBox from "./CommentBox";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<CommentBox username={"a"} />);
    expect(getByText("a")).toBeInTheDocument();
  });