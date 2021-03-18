import React from "react";
import { withHover } from "./withHover";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import UserForm from "./UserForm";

const UserCard = (props) => {
	const [loadMore, setLoadMore] = React.useState(false);
	const { hover, data } = props;
	const {
		name: { title, first, last },
		location: {
			city,
			country,
			street,
			postcode,
			timezone: { description },
		},
		dob: { age },
		registered: { date },
		email,
		phone,
		cell,
		picture: { thumbnail },
		login: { uuid, username },
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
		fontSize: "1.4rem",
	};
	const handleLoadMore = () => {
		setLoadMore(true);
	};
	return (
		<div id={uuid} style={userCardWrapper}>
			<div className="userCard__header">
				<div className="userCard__header_img">
					<img src={thumbnail} alt={`${title} ${first} ${last}`} />
				</div>
				<div className="userCard__header_details">
					<div>
						<span className="userCard__title">{`${title} ${first} ${last} ${age}`}</span>
					</div>
					<div className="bold">
						<span>{username}</span>
					</div>
					<div>
						<span>{email}</span>
					</div>
					<div>
						<span>{phone}</span>
					</div>
					<div>
						<span>{cell}</span>
					</div>
					{loadMore && (
						<React.Fragment>
							<div>
								<span>{`${street.number} ${street.name}`}</span>
							</div>
							<div>
								<span>{`${postcode} ${city} ${country}`}</span>
							</div>
							<div>
								<span>Timezone: {description}</span>
							</div>
							<div>
								<span>Registered: {date}</span>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
			{!loadMore && (
				<div className="userCard__more">
					<Button
						style={{ fontWeight: "bold" }}
						variant="primary"
						onClick={handleLoadMore}
					>
						Load more
					</Button>
				</div>
			)}
			{hover && !loadMore && (
				<div
					data-testid="userTooltip"
					className="userTooltip"
					style={tooltipStyle}
				>
					<div className="userTooltip__arrow"></div>
					<span className="userTooltip__content">{`${street.number} ${street.name}`}</span>
					<span className="userTooltip__content">{`${postcode} ${city} ${country}`}</span>
					<span className="userTooltip__content">Registered date :{date}</span>
				</div>
			)}
		</div>
	);
};

UserCard.propTypes = {
	hover: PropTypes.bool.isRequired,
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

export default withHover(UserCard);
