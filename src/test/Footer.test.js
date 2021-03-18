import React from "react";
import Footer from "../components/Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Render Footer", () => {
	it("should render the Banner", () => {
		const { container } = render(<Footer />);

		expect(container.firstChild.className).toBe("footer");
	});
});
