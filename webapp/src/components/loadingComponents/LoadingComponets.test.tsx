import { render } from "@testing-library/react";
import {ListLoadingItem} from "./ListLoadingItem.js";
import {LoadingMapInfo} from "./LoadingMapInfo.js";
import { SidebarLoadingItem } from "./SidebarLoadingItem.js";

test('check that the ListLoadingItem component renders propertly', async () => {

    const {getByTestId}= await render(<ListLoadingItem/>);
    expect(getByTestId("listLoadingItem")).toBeInTheDocument();

});

test('check that the LoadingMapInfo component renders propertly', async () => {

    const {getByTestId}= await render(<LoadingMapInfo/>);
    expect(getByTestId("loadingMapInfo")).toBeInTheDocument();

});

test('check that the SidebarLoadingItem component renders propertly', async () => {

    const {getByTestId}= await render(<SidebarLoadingItem/>);

});