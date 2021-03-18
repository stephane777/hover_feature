import React from "react";
import { withHover } from "./withHover";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const UserList = ({ data, hover, dispatch }) => {
	// const [hover, setHover] = React.useState(false);
	const [position, setPosition] = React.useState({ top: 10, left: 10 });
	const [editCard, setEditCard] = React.useState(null);
	const {
		name: { title, first, last },
		email,
		phone,
		picture: { thumbnail },
		location: { street, city, country, postcode },
		login: { uuid },
		dob: { age },
	} = data;

	React.useEffect(() => {
		const userElement = document.getElementById(uuid);
		const { offsetTop, offsetLeft } = userElement || {
			offsetTop: 10,
			offsetLeft: 10,
		};
		setTimeout(() => {
			setPosition({ top: userElement.offsetTop, left: userElement.offsetLeft });
		}, 1000);
	}, [data]);

	const handleEditCard = () => {
		dispatch({ type: "EDIT_CARD", id: uuid });
	};
	const tooltipStyle = {
		position: "absolute",
		top: `${position.top + 52}px`,
		left: `${position.left}px`,
	};
	const headerStyle = {
		fontSize: "12px",
	};
	const lastSpanStyle = {
		marginRight: "auto",
	};
	return (
		<div id={uuid} style={{ width: "100%" }}>
			<img src={thumbnail} alt={`${title} ${first} ${last}`} />
			<span className="userList__title" style={headerStyle}>
				{title}
			</span>
			<span className="userList__first" style={headerStyle}>
				{first}
			</span>
			<span
				className="userList__last"
				style={{ ...headerStyle, ...lastSpanStyle }}
			>
				{last}
			</span>
			<Button variant="primary" onClick={handleEditCard}>
				Edit
			</Button>
			{hover && (
				<div
					data-testid="userTooltip"
					className="userTooltip"
					style={tooltipStyle}
				>
					<div className="userTooltip__arrow"></div>
					<span className="userTooltip__content">{`${title} ${first} ${last}`}</span>
					<span className="userTooltip__content">{age}yo</span>
					<span className="userTooltip__content">{phone}</span>
					<span className="userTooltip__content">{email}</span>
					<span className="userTooltip__content">{`${street.number} ${street.name}`}</span>
					<span className="userTooltip__content">{city}</span>
				</div>
			)}
		</div>
	);
};

UserList.propTypes = {
	hover: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({
		cell: PropTypes.string,
		dob: PropTypes.object,
		email: PropTypes.string,
		gender: PropTypes.string,
		id: PropTypes.object,
		location: PropTypes.object,
		login: PropTypes.object,
		name: PropTypes.object,
		nat: PropTypes.string,
		phone: PropTypes.string,
		picture: PropTypes.object,
	}),
};
export default withHover(UserList);
