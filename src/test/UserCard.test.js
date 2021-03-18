import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestRenderer, { act } from "react-test-renderer";
import UserCard from "../components/UserCard";

const hover = false;
const data = {
	gender: "female",
	name: {
		title: "Mrs",
		first: "Emily",
		last: "Mortensen",
	},
	location: {
		street: {
			number: 8651,
			name: "Tingstedet",
		},
		city: "Randers Nv",
		state: "Nordjylland",
		country: "Denmark",
		postcode: 98755,
		coordinates: {
			latitude: "-29.6734",
			longitude: "110.0968",
		},
		timezone: {
			offset: "+9:00",
			description: "Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
		},
	},
	email: "emily.mortensen@example.com",
	login: {
		uuid: "488edda9-f042-434f-8162-e4dddf7055f5",
		username: "blackwolf380",
		password: "gotyoass",
		salt: "aplnp8Vf",
		md5: "cef86433e959d301a61dae314a6261fc",
		sha1: "a1efa322b6074e5f8c28ae5e0cb59820cac629cc",
		sha256: "d84520956439ab48d1b9b90dfdcab9a833f50e254de5807f878a70a5e3a75653",
	},
	dob: {
		date: "1990-02-09T04:06:25.218Z",
		age: 31,
	},
	registered: {
		date: "2017-05-09T01:55:53.657Z",
		age: 4,
	},
	phone: "94033936",
	cell: "92381351",
	id: {
		name: "CPR",
		value: "090290-9172",
	},
	picture: {
		large: "https://randomuser.me/api/portraits/women/78.jpg",
		medium: "https://randomuser.me/api/portraits/med/women/78.jpg",
		thumbnail: "https://randomuser.me/api/portraits/thumb/women/78.jpg",
	},
	nat: "DK",
};

let props = { hover, data };

describe("test UserCard component with hover false", () => {
	it("should render the component", () => {
		const { container } = render(<UserCard {...props} />);
		expect(container.firstChild.className).toBe("userCard");
	});
	it("should show an image :", () => {
		render(<UserCard {...props} />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"src",
			"https://randomuser.me/api/portraits/thumb/women/78.jpg"
		);
		expect(screen.getByAltText("Mrs Emily Mortensen"));
		expect(screen.getByRole("img")).toBeInTheDocument();
	});
	it("should show Gender, firstname, lastname, login, email, Phone and Cell", () => {
		render(<UserCard {...props} />);
		expect(screen.getByText("Mrs Emily Mortensen 31")).toBeInTheDocument();
		expect(screen.getByText("blackwolf380"));
		expect(screen.getByText("emily.mortensen@example.com")).toBeInTheDocument();
		expect(screen.getByText("94033936")).toBeInTheDocument();
		expect(screen.getByText("92381351")).toBeInTheDocument();
		expect(screen.getByText(/Load more/)).toBeInTheDocument();
	});
	it("shouldn't show the tooltip if not hovered", () => {
		props = {
			...props,
			hover: false,
		};
		expect(screen.queryByTestId("tooltip")).toBeNull();
	});
});
describe("test UserCard component with hover true", () => {
	it("should display the tooltip if hovered", () => {
		props = {
			...props,
			hover: true,
		};

		render(<UserCard {...props} />);
		expect(screen.getByText(/Load more/)).toBeInTheDocument();
		expect(screen.getByTestId("userTooltip")).toBeInTheDocument();

		const tooltipNode = document.querySelector(".userTooltip");
		const utils = within(tooltipNode);

		expect(utils.queryByText("Mrs Emily Mortensen 31")).toBeNull();
		expect(utils.getByText("8651 Tingstedet")).toBeInTheDocument();
		expect(utils.getByText("98755 Randers Nv Denmark")).toBeInTheDocument();
		expect(
			utils.getByText("Registered date :2017-05-09T01:55:53.657Z")
		).toBeInTheDocument();
	});
});

describe("Load more should display more data, remove the button and no tooltip", () => {
	it("should load more ", () => {
		props = {
			...props,
			hover: false,
		};
		const { rerender } = render(<UserCard {...props} />);
		expect(screen.getByText(/Load more/)).toBeInTheDocument();
		fireEvent.click(screen.getByText(/Load more/));
		expect(screen.queryByText(/Load more/)).toBeNull();

		expect(screen.getByText(/8651 Tingstedet/)).toBeInTheDocument();
		expect(screen.getByText(/98755 Randers Nv Denmark/)).toBeInTheDocument();
		expect(
			screen.getByText(/Timezone: Tokyo, Seoul, Osaka, Sapporo, Yakutsk/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Registered: 2017-05-09T01:55:53.657Z/)
		).toBeInTheDocument();
		props = {
			...props,
			hover: true,
		};
		rerender(<UserCard {...props} />);
		expect(screen.queryByTestId(/userTooltip/)).toBeNull();
	});
});

describe("test SNAPSHOT", () => {
	let root;
	it("should match the snapshot for hover false", () => {
		props = {
			...props,
			hover: false,
		};
		act(() => {
			root = TestRenderer.create(<UserCard {...props} />);
		});
		expect(root.toJSON()).toMatchSnapshot();
	});
	it("should match snapshot for hover true", () => {
		props = {
			...props,
			hover: true,
		};
		act(() => {
			root.update(<UserCard {...props} />);
		});
		expect(root.toJSON()).toMatchSnapshot();
	});
});
