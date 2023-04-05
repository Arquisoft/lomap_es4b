import { render } from "@testing-library/react";
import HeroSection from "./HeroSection";

test('check that the login form renders propertly', async () => {
    const {getByText} = render(<HeroSection />);
    expect(getByText("Lomap")).toBeInTheDocument();
});