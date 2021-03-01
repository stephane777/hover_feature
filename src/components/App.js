import React, { useEffect, useState } from "react";
import Users from "./Users";
// import Users from "./Users";

export default function App() {
	const [users, setUsers] = useState("");
	const [route, setRoute] = useState("userList");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch("https://randomuser.me/api/?results=20")
			.then((response) => response.json())
			.then((res) => {
				setUsers(res.results);
				console.log(res);

				return res;
			})
			.catch((error) => {
				console.log(`error: ${error.toString()}`);
				setError(error.toString());
			})
			.finally((list) => {
				setLoading(false);
				// console.group("useEffect finally");
				// console.groupEnd("");
			});
		return () => {
			console.log(`UseEffect cleanup`);
		};
	}, []);
	const userWrapper = {
		display: "flex",
		flexWrap: route === "userList" ? "no-wrap" : "wrap",
		flexDirection: route === "userList" ? "column" : "row",
		justifyContent: "space-between",
		alignItems: "space-around",
		maxWidth: "44rem",
		margin: "0 auto",
	};

	const toggleUI = () => {
		setRoute((route) => (route === "userList" ? "userCard" : "userList"));
	};

	return (
		<div className="App">
			<h1>Users with tooltip</h1>
			<div className="menu">
				<div className="menu__link">
					<a href="#" onClick={toggleUI}>
						{route === "userList" ? "Card" : "List"}
					</a>
				</div>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{users && (
				<div style={userWrapper}>
					<Users users={users} route={route} />
				</div>
			)}
		</div>
	);
}
