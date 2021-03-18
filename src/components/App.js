import React, { useEffect, useState } from "react";
import Users from "./Users";
import axios from "axios";
import Banner from "./Banner";
import Footer from "./Footer";
import UserForm from "./UserForm";
import { Button } from "react-bootstrap";

const API = `https://randomuser.me/api/`;
const param = `?results=`;
const totalUsers = "20";
const extraParam = "&noinfo";
const seed = "&seed=1b40feb2ff76973c";
export const URL = `${API}${param}${totalUsers}${seed}${extraParam}`;

const getUsersAndStoreLocalStorage = (URL, dispatch) => {
	return axios
		.get(URL)
		.then((res) => {
			const withEditCardProp = res.data.results.map((user) => ({
				...user,
				editCard: false,
			}));
			dispatch({ type: "LOAD_USERS_SUCCESS", results: withEditCardProp });
			dispatch({ type: "STOP_LOADING" });
			return withEditCardProp;
		})
		.catch((error) => {
			dispatch({ type: "SET_ERROR", error });
			dispatch({ type: "STOP_LOADING" });
		});
};

const initialState = {
	users: [],
	route: "userList",
	loading: false,
	error: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "START_LOADING":
			return {
				...state,
				loading: true,
			};
		case "STOP_LOADING":
			return {
				...state,
				loading: false,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.error,
			};
		case "RESET_ERROR":
			return {
				...state,
				error: null,
			};
		case "LOAD_USERS_SUCCESS":
			return {
				...state,
				users: action.results,
			};
		case "TOGGLE_ROUTE":
			return {
				...state,
				route: state.route === "userList" ? "userCard" : "userList",
			};
		case "EDIT_CARD":
			return {
				...state,
				users: state.users.map((user) => {
					return user.login.uuid === action.id
						? { ...user, editCard: true }
						: user;
				}),
			};
		case "UPDATE_USER":
			return {
				...state,
				users: state.users.map((user) => {
					if (user.login.uuid === action.user.login.uuid) {
						return {
							...user,
							name: {
								...user.name,
								first: action.user.name.first,
								last: action.user.name.last,
							},
							login: {
								...user.login,
								username: action.user.login.username,
							},
							email: action.user.email,
							phone: action.user.phone,
							cell: action.user.cell,
							location: {
								...user.location,
								street: {
									number: action.user.location.street.number,
									name: action.user.location.street.name,
								},
								city: action.user.location.city,
								postcode: action.user.location.postcode,
							},
							editCard: action.user.editCard,
						};
					} else {
						return user;
					}
				}),
			};
		default:
			return state;
	}
};

export default function App() {
	const [appState, dispatch] = React.useReducer(reducer, initialState);
	const { users, loading, error, route } = appState;
	useEffect(() => {
		dispatch({ type: "START_LOADING" });
		appState.users.length === 0
			? getUsersAndStoreLocalStorage(URL, dispatch)
			: null;
	}, []);

	const userWrapper = {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "space-around",
		maxWidth: "80rem",
		margin: "6rem auto",
		minHeight: "69.5vh",
		alignContent: "flex-start",
	};

	const toggleUI = () => {
		dispatch({ type: "TOGGLE_ROUTE" });
	};

	const editCardUI = (user) => {
		// console.log(user);
		// const {
		// 	name: { title, first, last },
		// } = user;
		return (
			<React.Fragment>
				<UserForm user={user} dispatch={dispatch} />
			</React.Fragment>
		);
	};

	const editedUser = users?.filter((user) => user.editCard === true);

	return (
		<div className="App">
			<Banner />

			<div className="menu u-margin-bottom-medium">
				<h1 className="u-margin-top-large u-margin-bottom-medium ">Accounts</h1>
				<div className="menu__link">
					<Button variant="primary" onClick={toggleUI}>
						{route === "userList" ? "Card" : "List"}
					</Button>
				</div>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{users && editedUser.length === 0 && !loading && !error && (
				<div data-testid={route} style={userWrapper}>
					<Users users={users} dispatch={dispatch} route={route} />
				</div>
			)}
			{editedUser.length === 1 &&
				!loading &&
				!error &&
				editCardUI(editedUser[0])}
			<Footer />
		</div>
	);
}
