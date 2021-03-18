import React from "react";
import Banner from "../components/Banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Render Banner", () => {
	it("should render the Banner", () => {
		const { container } = render(<Banner />);
		expect(container.firstChild.className).toBe("banner");
	});
});
