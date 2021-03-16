import React from "react";
import axios from "axios";
import {
	render,
	screen,
	fireEvent,
	cleanup,
	act,
} from "@testing-library/react";
// import TestRenderer, { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import App from "../components/App";
import { twoUsers } from "./utils";

jest.mock("axios");

afterEach(cleanup);

describe("testing APP", () => {
	it("should render App component", async () => {
		const promise = Promise.resolve({
			data: {
				results: twoUsers,
			},
		});
		axios.get.mockImplementation(() => promise);
		const { container } = render(<App />);
		expect(container.firstChild.className).toBe("App");
		await act(() => promise);
	});
	it("should show loading...", async () => {
		const promise = Promise.resolve({
			data: {
				results: twoUsers,
			},
		});
		act(() => {
			render(<App />);
		});
		// screen.debug();
		expect(screen.getByText("Loading...")).toBeInTheDocument();
		expect(await screen.findByTestId("userList")).toBeInTheDocument();
		await act(() => promise);
	});
	it("should display user Card when user click on the Card link", async () => {
		const promise = Promise.resolve({
			data: {
				results: twoUsers,
			},
		});
		act(() => {
			render(<App />);
		});
		expect(await screen.findByTestId("userList")).toBeInTheDocument();
		act(() => {
			fireEvent.click(screen.getByText("Card"));
		});
		expect(await screen.findByTestId("userCard")).toBeInTheDocument();
		await act(() => promise);
	});
});
