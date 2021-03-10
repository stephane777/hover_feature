import React from "react";
import Users from "../Users";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer, { act } from "react-test-renderer";

import { twoUsers } from "./utils";

describe("test User component", () => {
	it("should render the User component with default userList props", () => {
		let mainContainer;
		expect.assertions(1);
		act(() => {
			const { container } = render(<Users users={twoUsers} />);
			mainContainer = container;
		});
		expect(mainContainer.firstChild.firstChild.className).toBe("userList");
		// expect()
	});
	it("should show an image, title, first and lastname", () => {
		expect.assertions(23);
		act(() => {
			render(<Users users={twoUsers} />);
		});
		expect(screen.getAllByRole("img").length).toBe(2);
		twoUsers.forEach(
			({
				login: { uuid },
				name: { title, first, last },
				picture: { thumbnail },
				dob: { age },
				email,
				phone,
				location: {
					street: { number, name },
					postcode,
					city,
				},
			}) => {
				const userContainer = document.getElementById(uuid);
				const utils = within(userContainer);
				const img = utils.getByRole("img");
				expect(img).toHaveAttribute("src", thumbnail);
				expect(img).toHaveAttribute("alt", `${title} ${first} ${last}`);
				expect(utils.getByText(title)).toBeInTheDocument();
				expect(utils.getByText(first)).toBeInTheDocument();
				expect(utils.getByText(last)).toBeInTheDocument();

				expect(utils.queryByText(age)).toBeNull();
				expect(utils.queryByText(email)).toBeNull();
				expect(utils.queryByText(phone)).toBeNull();
				expect(utils.queryByText(`${number} ${name}`)).toBeNull();
				expect(utils.queryByText(postcode)).toBeNull();
				expect(utils.queryByText(city)).toBeNull();
			}
		);
	});

	it("Should render user card: ", () => {
		const { container } = render(<Users users={twoUsers} route="userCard" />);
		expect(container.firstChild.className).toBe("userCard");
	});
	it("should render all user details", () => {
		expect.assertions(22);
		act(() => {
			render(<Users users={twoUsers} route="userCard" />);
		});
		twoUsers.forEach(
			({
				login: { uuid },
				name: { title, first, last },
				picture: { thumbnail },
				dob: { age },
				email,
				phone,
				location: {
					street: { number, name },
					postcode,
					city,
				},
			}) => {
				const userContainer = document.getElementById(uuid);
				const utils = within(userContainer);
				const img = utils.getByRole("img");
				expect(img).toHaveAttribute("src", thumbnail);
				expect(img).toHaveAttribute("alt", `${title} ${first} ${last}`);
				expect(utils.getByText(title)).toBeInTheDocument();
				expect(utils.getByText(first)).toBeInTheDocument();
				expect(utils.getByText(last)).toBeInTheDocument();

				expect(utils.getByText(age)).toBeInTheDocument();
				expect(utils.getByText(email)).toBeInTheDocument();
				expect(utils.getByText(phone)).toBeInTheDocument();
				expect(utils.getByText(`${number} ${name}`)).toBeInTheDocument();
				expect(utils.getByText(postcode)).toBeInTheDocument();
				expect(utils.getByText(city)).toBeInTheDocument();
			}
		);
	});

	describe("Snapshot testing", () => {
		let root;
		it("should match snapshot with userList", async () => {
			act(() => {
				root = renderer.create(<Users users={twoUsers} />);
			});
			expect(await root.toJSON()).toMatchSnapshot();
		});
		it("should match snapshot with userCard", async () => {
			act(() => {
				root.update(<Users users={twoUsers} route="userCard" />);
			});
			expect(await root.toJSON()).toMatchSnapshot();
		});
	});
});
