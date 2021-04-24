import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state, dispatch] = useContext(AuthContext);
	const { loading } = state;

	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					"loading..."
				) : state.isLogin ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
