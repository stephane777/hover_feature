import React from "react";
import Users from "../components/Users";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer, { act } from "react-test-renderer";

import { twoUsers } from "./utils";

const dispatch = jest.fn();

describe.only("test User component", () => {
	it("should render the User component with default userList props", () => {
		let mainContainer;
		expect.assertions(1);
		act(() => {
			const { container } = render(
				<Users users={twoUsers} dispatch={dispatch} />
			);
			mainContainer = container;
		});
		expect(mainContainer.firstChild.className).toBe("userList");
		// expect()
	});
	it("should show an image, title, first and lastname", () => {
		expect.assertions(23);
		act(() => {
			render(<Users users={twoUsers} dispatch={dispatch} />);
		});
		expect(screen.getAllByRole("img").length).toBe(2);
		twoUsers.forEach(
			({
				login: { uuid, username },
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
		const { container } = render(
			<Users users={twoUsers} route="userCard" dispatch={dispatch} />
		);
		expect(container.firstChild.className).toBe("userCard");
	});
	it("should render all user details", () => {
		// expect.assertions(16);
		act(() => {
			render(<Users users={twoUsers} route="userCard" dispatch={dispatch} />);
		});
		twoUsers.forEach(
			({
				login: { uuid, username },
				name: { title, first, last },
				picture: { thumbnail },
				dob: { age },
				email,
				phone,
				cell,
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
				expect(
					screen.getByText(`${title} ${first} ${last} ${age}`)
				).toBeInTheDocument();

				expect(screen.getByText(username));
				expect(screen.getByText(email)).toBeInTheDocument();
				expect(screen.getByText(phone)).toBeInTheDocument();
				expect(screen.getByText(cell)).toBeInTheDocument();
				expect(screen.getAllByText(/Load more/)).toHaveLength(2);
			}
		);
	});

	describe("Snapshot testing", () => {
		let root;
		it("should match snapshot with userList", async () => {
			act(() => {
				root = renderer.create(<Users users={twoUsers} dispatch={dispatch} />);
			});
			expect(await root.toJSON()).toMatchSnapshot();
		});
		it("should match snapshot with userCard", async () => {
			act(() => {
				root.update(
					<Users users={twoUsers} route="userCard" dispatch={dispatch} />
				);
			});
			expect(await root.toJSON()).toMatchSnapshot();
		});
	});
});
