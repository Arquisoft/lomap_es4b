import { render } from "@testing-library/react";
import ProfileViewer from "./ProfileViewer";
import { ProSidebarProvider } from 'react-pro-sidebar';

const flushPromises = require('flush-promises');

jest.mock("@inrupt/solid-ui-react", () => ({
	useSession: () => ({
		session: {
			info: {
				webId: "https://uo281997.inrupt.net/profile/card#me",
			},
		},
	}),
}));

test('check that the login form renders propertly', async () => {
    // const {getByTestId} = await render(<ProSidebarProvider><ProfileViewer/></ProSidebarProvider>);
     
}); 