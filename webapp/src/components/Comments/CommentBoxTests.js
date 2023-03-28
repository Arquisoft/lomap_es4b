import React from 'react'
import { render } from "@testing-library/react";
import UserList from "./UserList";
import {User} from "../shared/shareddtypes";
import CommentBox from "./CommentBox";

test('Check that it has name and text', async () => {
    const {getByText} = render(<CommentBox username={"a"}/>);
    expect(getByText()).toBeInTheDocument();
});