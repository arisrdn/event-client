import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Menu from "./Menu";
import { AuthContext } from "../../contexts/authContext";

const NavbarL = () => {
	const [state, dispatch] = useContext(AuthContext);

	const handleOpenLogin = () => {
		dispatch({
			type: "MODAL_LOGIN_OPEN",
		});
	};
	const handleOpenRegister = () => {
		dispatch({
			type: "MODAL_REGISTER_OPEN",
		});
	};
	return (
		<nav>
			<Navbar className="nav-bg">
				<Link to="/">
					<Navbar.Brand to="/" className="title-ways text-brown ml-5">
						Navbar Brand
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse id="basic-navbar-nav" className=""></Navbar.Collapse>
				<Menu />
			</Navbar>
		</nav>
	);
};

export default NavbarL;
