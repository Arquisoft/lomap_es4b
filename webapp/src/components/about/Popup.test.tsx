import { render } from "@testing-library/react";
import Popup from "./Popup";

test('check that the About page renders properly', async () => {
    const {getByTestId} = await render(<Popup content={{a:"aaa"}}
                                              handleClose={()=>{}} />);
    expect(getByTestId("spanPopup")).toBeInTheDocument();
    expect(getByTestId("spanPopup")).toBeVisible();
});