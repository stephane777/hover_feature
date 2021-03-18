import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "../components/UserForm";

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

const {
	name: { title, first: firstName, last: lastName },
	login: { username: loginUsername, uuid },
	email: userEmail,
	phone: userPhone,
	cell: userCell,
	location: {
		street: { name: userStreetName, number: userNumStreet },
		postcode: userPostcode,
		city: userCity,
	},
} = data;
const mockDispatch = jest.fn();

describe("UserForm", () => {
	it("should render the UserForm component", () => {
		const { container } = render(
			<UserForm user={data} dispatch={mockDispatch} />
		);
		expect(container.firstChild.className).toBe("userForm");
	});
	it("should display the values on all input from the user props", () => {
		render(<UserForm user={data} dispatch={mockDispatch} />);

		const firstNameInput = document.getElementById("formFirstName");
		expect(firstNameInput).toHaveAttribute("value", firstName);

		const lastNameInput = document.getElementById("formLastName");
		expect(lastNameInput).toHaveAttribute("value", lastName);

		const loginInput = document.getElementById("formLogin");
		expect(loginInput).toHaveAttribute("value", loginUsername);

		const emailInput = document.getElementById("formEmail");
		expect(emailInput).toHaveAttribute("value", userEmail);

		const phoneInput = document.getElementById("formPhone");
		expect(phoneInput).toHaveAttribute("value", userPhone);

		const cellInput = document.getElementById("formCell");
		expect(cellInput).toHaveAttribute("value", userCell);

		const streetNumberInput = document.getElementById("formStreetNumber");
		expect(streetNumberInput).toHaveAttribute(
			"value",
			userNumStreet.toString()
		);

		const streetNameInput = document.getElementById("formStreetName");
		expect(streetNameInput).toHaveAttribute("value", userStreetName);

		const postcodeInput = document.getElementById("formPostcode");
		expect(postcodeInput).toHaveAttribute("value", userPostcode.toString());

		const cityInput = document.getElementById("formCity");
		expect(cityInput).toHaveAttribute("value", userCity);
	});
	it("submit should call dispatch", () => {
		let wrapper;
		act(() => {
			const { container } = render(
				<UserForm user={data} dispatch={mockDispatch} />
			);
			expect(container.firstChild.className).toBe("userForm");
			fireEvent.click(screen.getByText("Submit"));
			expect(mockDispatch).toHaveBeenCalledTimes(1);
			expect(mockDispatch).toHaveBeenCalledWith({
				type: "UPDATE_USER",
				user: {
					name: {
						first: firstName,
						last: lastName,
					},
					location: {
						street: {
							number: userNumStreet,
							name: userStreetName,
						},
						city: userCity,
						postcode: userPostcode,
					},
					phone: userPhone,
					cell: userCell,
					email: userEmail,
					login: {
						username: loginUsername,
						uuid,
					},
					editCard: false,
				},
			});
		});
	});
});
