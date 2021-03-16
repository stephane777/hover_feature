import React from "react";
import { render, screen } from "@testing-library/react";
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
	it("should show Age, email, Phone, street, postcode and city", () => {
		render(<UserCard {...props} />);
		expect(screen.getByText("Age:")).toBeInTheDocument();
		expect(screen.getByText("email:")).toBeInTheDocument();
		expect(screen.getByText("Phone:")).toBeInTheDocument();
		expect(screen.getByText("Street:")).toBeInTheDocument();
		expect(screen.getByText("City:")).toBeInTheDocument();
		expect(screen.getByText("Postcode:")).toBeInTheDocument();
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
		// screen.debug();
		expect(screen.getByTestId("tooltip")).toBeInTheDocument();
	});
	it("should display the TOOLTIP with title, Street and City in the  hover", () => {
		props = {
			...props,
			hover: true,
		};
		render(<UserCard {...props} />);
		// screen.debug();
		expect(screen.getByText("Mrs Emily Mortensen")).toBeInTheDocument();
		expect(screen.getAllByText("8651 Tingstedet")).toHaveLength(2);
		expect(screen.getAllByText("Randers Nv")).toHaveLength(2);
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
