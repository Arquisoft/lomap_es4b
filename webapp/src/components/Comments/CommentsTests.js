import React from 'react'
import { render } from "@testing-library/react";
import UserList from "./UserList";
import {User} from "../shared/shareddtypes";
import Comments from "./Comments";

test('Check that it has name and text', async () => {
    const {getByText} = render(<Comments username={"a"}/>);
    expect(getByText()).toBeInTheDocument();
});