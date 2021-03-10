import React, { useEffect, useState } from "react";
import Users from "./Users";
import axios from "axios";

const API = `https://randomuser.me/api/`;
const param = `?results=`;
const totalUsers = "20";
export const URL = `${API}${param}${totalUsers}`;

const getUsers = (URL, setUsers, setLoading, setError) => {
	axios
		.get(URL)
		.then((res) => {
			setUsers(res.data.results);
			setLoading(false);
		})
		.catch((error) => {
			setError(error);
			setLoading(false);
		});
};

export default function App() {
	const [users, setUsers] = useState("");
	const [route, setRoute] = useState("userList");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// console.log(...getUserParam);
	useEffect(() => {
		setLoading(true);
		getUsers(URL, setUsers, setLoading, setError);
	}, []);
	const userWrapper = {
		display: "flex",
		flexWrap: route === "userList" ? "no-wrap" : "wrap",
		flexDirection: route === "userList" ? "column" : "row",
		justifyContent: "space-between",
		alignItems: "space-around",
		maxWidth: route === "userList" ? "36rem" : "75rem",
		margin: "0 auto",
	};

	const toggleUI = () => {
		setRoute((route) => (route === "userList" ? "userCard" : "userList"));
	};

	return (
		<div className="App">
			<h1 className="u-margin-top-large u-margin-bottom-medium ">
				Users with tooltip
			</h1>
			<div className="menu u-margin-bottom-medium">
				<div className="menu__link">
					<a href="#" onClick={toggleUI}>
						{route === "userList" ? "Card" : "List"}
					</a>
				</div>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{users && (
				<div data-testid={route} style={userWrapper}>
					<Users users={users} route={route} />
				</div>
			)}
		</div>
	);
}
