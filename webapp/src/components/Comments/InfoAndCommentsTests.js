import React from 'react'
import { render } from "@testing-library/react";
import UserList from "./UserList";
import {User} from "../shared/shareddtypes";

test('Check that it has name and text', async () => {
    const {getByText} = render(<Comment username={"a"}/>);
    expect(getByText()).toBeInTheDocument();
});