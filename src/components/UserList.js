import React from "react";
import { withHover } from "./withHover";

const UserList = ({ data, hover }) => {
	// const [hover, setHover] = React.useState(false);
	const [position, setPosition] = React.useState({ top: 10, left: 10 });
	const {
		name: { title, first, last },
		location,
		email,
		phone,
		picture: { thumbnail },
		location: { street, city, country, postcode },
		login: { uuid },
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

	const tooltipStyle = {
		position: "absolute",
		top: `${position.top + 52}px`,
		left: `${position.left}px`,
	};
	const headerStyle = {
		fontSize: "12px",
	};
	return (
		<div id={uuid} className="userList">
			<img src={thumbnail} alt={`${title} ${first} ${last}`} />
			<span className="user__title" style={headerStyle}>
				{title}
			</span>
			<span className="user__first" style={headerStyle}>
				{first}
			</span>
			<span className="user__last" style={headerStyle}>
				{last}
			</span>
			{hover && (
				<div data-testid="tooltip" className="tooltip" style={tooltipStyle}>
					<div className="tooltip__arrow"></div>
					<span className="tooltip__title">{`${title} ${first} ${last}`}</span>
					<span className="tooltip__street">{`${street.number} ${street.name}`}</span>
					<span className="tooltip__city">{city}</span>
				</div>
			)}
		</div>
	);
};
export default withHover(UserList);
