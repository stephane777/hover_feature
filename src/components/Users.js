import React from "react";
import UserList from "../components/UserList";
import UserCard from "../components/UserCard";
import PropTypes from "prop-types";

const userList = (user, dispatch) => {
	const props = {
		key: user.login.uuid,
		data: user,
		dispatch,
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

const Users = ({ users, route, dispatch }) => {
	return users.map((user) => {
		return route === "userList" ? userList(user, dispatch) : userCard(user);
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
