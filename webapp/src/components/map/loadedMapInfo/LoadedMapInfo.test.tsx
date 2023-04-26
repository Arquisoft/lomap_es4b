import { render } from "@testing-library/react";
import LoadedMapInfo from "./LoadedMapInfo";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useSession } from "@inrupt/solid-ui-react";

jest.mock("@inrupt/solid-ui-react", () => ({
	useSession: () => ({
		session: {
			info: {
				webId: "https://276467.inrupt.net/profile/card#me",
			},
		},
	}),
}));

test('check that the map view renders propertly', async () => {
	// const {session} = useSession();
    const {getByText} = await render(<LoadedMapInfo mapId={1} webId={"https://276467.inrupt.net/profile/card#me"}/>);
    expect(getByText("Cargando")).toBeInTheDocument();
});