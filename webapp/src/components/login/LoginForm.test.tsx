import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<LoginForm/>);
    expect(getByTestId("containerLoginForm")).toBeInTheDocument();
    expect(getByTestId("containerLoginForm")).toBeVisible();
    expect(getByTestId("homeLoginForm")).toBeInTheDocument();
    expect(getByTestId("homeLoginForm")).toBeVisible();
  });