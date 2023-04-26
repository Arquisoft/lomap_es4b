import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import {act} from "react-dom/test-utils";

test('check that the login form renders propertly', async () => {
    const {getByTestId} = await render(<LoginForm/>);
    act(()=>{

       expect(getByTestId("containerLoginForm")).toBeInTheDocument();
       expect(getByTestId("containerLoginForm")).toBeVisible();
       expect(getByTestId("homeLoginForm")).toBeInTheDocument();
       expect(getByTestId("homeLoginForm")).toBeVisible();

   });

  });