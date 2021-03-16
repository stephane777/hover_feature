import React from "react";

import {
	Form,
	Button,
	Container,
	Col,
	Row,
	InputGroup,
	ToggleButton,
} from "react-bootstrap";

const UserForm = ({ user, dispatch }) => {
	// const [radioValue, setRadioValue] = React.useState("foo");
	const [firstName, setFirstName] = React.useState(user.name.first);
	const [lastName, setLastName] = React.useState(user.name.last);
	const [loginUsername, setLoginUsername] = React.useState(user.login.username);
	const [userEmail, setUserEmail] = React.useState(user.email);
	const [userPhone, setUserPhone] = React.useState(user.phone);
	const [userCell, setUserCell] = React.useState(user.cell);
	const [userNumStreet, setUserNumStreet] = React.useState(
		user.location.street.number
	);
	const [userStreetName, setUserStreetName] = React.useState(
		user.location.street.name
	);
	const [userPostcode, setUserPostcode] = React.useState(
		user.location.postcode
	);
	const [userCity, setUserCity] = React.useState(user.location.city);
	const [validated, setValidated] = React.useState(false);
	const {
		name: { title, first, last },
		login: { uuid },
	} = user;

	const radios = [
		{ name: "Male", value: "male" },
		{ name: "Female", value: "female" },
	];
	const gender = title === "Mr" ? "male" : "female";
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) return;
		setValidated(true);
		dispatch({
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
	};
	return (
		<div className="userForm">
			<h1>{`${title} ${first} ${last}`}</h1>
			<Form noValidate onSubmit={handleSubmit} validated={validated}>
				<Form.Group
					as={Row}
					controlId="formGender"
					className="justify-content-sm-center row_clear_margin"
				>
					<Col sm={1}>Gender</Col>
					<Col
						sm={4}
						style={{ display: "flex" }}
						className="justify-content-start"
					>
						{radios.map((radio, index) => (
							<ToggleButton
								variant={null}
								key={index}
								type="radio"
								name="radio"
								value={radio.value}
								checked={radio.value === gender}
								disabled
							>
								{radio.name}
							</ToggleButton>
						))}
					</Col>
				</Form.Group>
				<Form.Group
					as={Row}
					controlId="formFirstName"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1} size="lg">
						FirstName
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							size="lg"
							type="text"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the firstname.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formLastName"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}>
						Last Name
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							size="lg"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the lastname.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formLogin"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}>
						Login
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							value={loginUsername}
							onChange={(e) => setLoginUsername(e.target.value)}
							size="lg"
							type="text"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the login.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formEmail"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}>
						Email
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							size="lg"
							type="email"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the user email.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formPhone"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}>
						Phone
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							value={userPhone}
							onChange={(e) => setUserPhone(e.target.value)}
							size="lg"
							type="text"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the phone number.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formCell"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}>
						Cell
					</Form.Label>
					<Col sm={4}>
						<Form.Control
							size="lg"
							type="text"
							value={userCell}
							onChange={(e) => setUserCell(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the cellular number.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formNumberStreet"
					className="justify-content-sm-center row_clear_margin"
				>
					<Col sm={1} />
					<Col sm={1}>
						<Form.Label>Number</Form.Label>
						<Form.Control
							value={userNumStreet}
							onChange={(e) => setUserNumStreet(e.target.value)}
							size="lg"
							type="text"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the street number.
						</Form.Control.Feedback>
					</Col>
					<Col sm={3}>
						<Form.Label>Street Name</Form.Label>
						<Form.Control
							size="lg"
							type="text"
							value={userStreetName}
							onChange={(e) => setUserStreetName(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the street name.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group
					as={Row}
					controlId="formPostCodeCountry"
					className="justify-content-sm-center row_clear_margin"
				>
					<Form.Label column sm={1}></Form.Label>
					<Col sm={1}>
						<Form.Label>Postcode</Form.Label>
						<Form.Control
							value={userPostcode}
							onChange={(e) => setUserPostcode(e.target.value)}
							size="lg"
							type="text"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the postcode.
						</Form.Control.Feedback>
					</Col>
					<Col sm={3}>
						<Form.Label>City</Form.Label>
						<Form.Control
							size="lg"
							type="text"
							value={userCity}
							onChange={(e) => setUserCity(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide the City.
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Row className="justify-content-sm-center row_clear_margin">
					<Button
						variant="primary"
						type="submit"
						className="justify-content-sm-start row_clear_margin"
						style={{ textAlign: "center" }}
					>
						Submit
					</Button>
				</Row>
			</Form>
		</div>
	);
};
export default UserForm;
