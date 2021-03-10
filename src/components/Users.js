import React from "react";
import UserList from "./UserList";
import UserCard from "./UserCard";
import PropTypes from "prop-types";

const userList = (user) => {
	const props = {
		key: user.login.uuid,
		data: user,
	};
	return <UserList {...props} />;
};

const userCard = (user) => {
	const props = {
		key: user.login.uuid,
		data: user,
	};
	return <UserCard {...props} />;
};

const Users = ({ users, route }) => {
	return users.map((user) => {
		return route === "userList" ? userList(user) : userCard(user);
	});
};

Users.propTypes = {
	users: PropTypes.array.isRequired,
	route: PropTypes.oneOf(["userList", "userCard"]),
};

Users.defaultProps = {
	route: "userList",
};
export default Users;
