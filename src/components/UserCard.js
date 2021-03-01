import React from "react";
import { withHover } from "./withHover";

const UserCard = (props) => {
	const { hover, data } = props;
	const {
		name: { title, first, last },
		location: { city, country, street, postcode },
		dob: { age },
		email,
		phone,
		picture: { thumbnail },
		login: { uuid },
	} = data;

	const tooltipStyle = {
		position: "absolute",
		top: "6rem",
		left: "0",
	};
	const userCardWrapper = {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "flex-start",
		overflow: "hidden",
	};
	return (
		<div id={uuid} style={userCardWrapper}>
			<div className="userCard__header">
				<img src={thumbnail} alt={`${title} ${first} ${last}`} />
				<span className="user__title">{title}</span>
				<span className="user__first">{first}</span>
				<span className="user__last">{last}</span>
			</div>
			<div>
				<span className="bold">Age: </span>
				<span>{age}</span>
			</div>
			<div>
				<span className="bold">email: </span>
				<span>{email}</span>
			</div>
			<div>
				<span className="bold">Phone: </span>
				<span>{phone}</span>
			</div>
			<div>
				<span className="bold">Street: </span>
				<span>{`${street.number} ${street.name}`}</span>
			</div>
			<div>
				<span className="bold">Postcode: </span>
				<span>{postcode}</span>
			</div>
			<div>
				<span className="bold">City: </span>
				<span>{city}</span>
			</div>

			{hover && (
				<div className="tooltip" style={tooltipStyle}>
					<div className="tooltip__arrow"></div>
					<span className="tooltip__title">{`${title} ${first} ${last}`}</span>
					<span className="tooltip__first">{`${street.number} ${street.name}`}</span>
					<span className="tooltip__last">{city}</span>
				</div>
			)}
		</div>
	);
};
export default withHover(UserCard);
