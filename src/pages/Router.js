import React, { useEffect, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { API, setAuthToken } from "../config/api";
import { AuthContext } from "../contexts/authContext";
import PrivateRoute from "../components/route/PrivateRoute";

import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateEvent from "./event/Create";
import Navbar from "../components/header/Navbar";
import Dasboard from "./event/Dasboard";
import Event from "./event/Event";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

export default function MasterRoute() {
	let query = useQuery();
	const [state, dispatch] = useContext(AuthContext);
	const checkUser = async () => {
		try {
			const response = await API.get("/check-auth");

			if (response.status === 401) {
				return dispatch({
					type: "AUTH_ERROR",
				});
			}

			let payload = response.data.data.user;
			payload.token = localStorage.token;

			dispatch({
				type: "LOGIN_SUCCESS",
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: "AUTH_ERROR",
			});
		}
	};

	useEffect(() => {
		checkUser();
	}, []);

	return (
		<>
			{!state.isLogin ? "" : <Navbar />}
			<Switch>
				<PrivateRoute exact path="/dasboard" component={Dasboard} />
				<PrivateRoute exact path="/event/add" component={CreateEvent} />
				<PrivateRoute exact path="/" component={Event} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Switch>
		</>
	);
}
