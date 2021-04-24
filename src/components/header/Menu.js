import { useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useHistory } from "react-router";

import { AuthContext } from "../../contexts/authContext";

const Menu = () => {
	const [state, dispatch] = useContext(AuthContext);
	const history = useHistory();
	const logoutUser = () => {
		// console.log("lll", state);
		dispatch({
			type: "LOGOUT",
		});
		// cartDispatch({
		// 	type: "EMPETY_CART",
		// });
	};
	return (
		<>
			<Nav className="ml-auto">
				<Nav.Link as={Link} to="/event/add">
					+ Add Event
				</Nav.Link>
				<Nav.Link as={Link} to="/dasboard">
					Dashboard
				</Nav.Link>
				<button onClick={logoutUser} className="btn btn-sm btn-blue">
					{" "}
					Logout
				</button>
			</Nav>
		</>
	);
};

export default Menu;
