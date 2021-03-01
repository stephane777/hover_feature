import React from "react";
import UserList from "./UserList";
import UserCard from "./UserCard";
// import {withHover} from "./withHover";

const userList = (user) => {
	const props = {
		key: user.login.uuid,
		data: user,
	};
	return <UserList {...props} />;
	// return withHover(UserList, props);
};
const userCard = (user) => {
	const props = {
		key: user.login.uuid,
		data: user,
	};
	return <UserCard {...props} />;
	// return withHover(UserCard, props)
};
const Users = ({ users, route }) => {
	return users.map((user) => {
		return route === "userList" ? userList(user) : userCard(user);
	});
};
export default Users;
