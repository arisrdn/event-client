import "../../assets/css/loginRegister.css";
import image from "../../assets/img/undraw_events_2p66.svg";

import { Container, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../contexts/authContext";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
	fullName: yup.string().min(3).required(),
});

const Login = () => {
	const router = useHistory();
	const [state, dispatch] = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = useMutation(async (data) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			email: data.email,
			password: data.password,
			fullName: data.fullName,
		});
		const response = await API.post("/register", body, config);

		console.log("res-akhir", response.data?.data?.user?.token);

		setAuthToken(response.data?.data?.user?.token);
		dispatch({
			type: "LOGIN_SUCCESS",
			payload: response.data?.data?.user,
		});

		router.push("/");
		return response;
	});

	// alert
	const [visibleAlert, setVisibleAlert] = useState(false);

	useEffect(() => {
		if (onSubmit.error?.response?.data?.message) {
			setVisibleAlert(true);
			setTimeout(() => {
				setVisibleAlert(false);
			}, 2000);
		}
	}, [onSubmit.error?.response?.data?.message]);

	return (
		<>
			<Container fluid className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
				<div className=" border-0">
					<div className="row d-flex mt-lg-5">
						<div className="col-lg-6">
							<div className="card1 pb-5">
								<div className="row px-3 justify-content-center mt-4 mb-5 border-line">
									<img src={image} className="image" />
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="card2 card border-0 px-4 py-5">
								<Alert
									variant="danger"
									show={visibleAlert}
									onClose={() => setVisibleAlert(false)}
									dismissible
								>
									{onSubmit.error?.response?.data?.message}
								</Alert>

								<form onSubmit={handleSubmit(onSubmit.mutate)}>
									<div
										className={
											errors.fullName?.message
												? "error row px-3 mt-3"
												: "row px-3 mt-3"
										}
									>
										<label className="mb-1">
											<h6 className="mb-0 text-sm">Full Name</h6>
										</label>
										<input
											className="--input error "
											type="text"
											placeholder="Enter Full Name"
											required
											{...register("fullName")}
										/>
										<div className="error-message">
											{errors.fullName?.message}
										</div>
									</div>
									<div
										className={
											errors.email?.message
												? "error row px-3 mt-3"
												: "row px-3 mt-3"
										}
									>
										<label className="mb-1">
											<h6 className="mb-0 text-sm">Email Address</h6>
										</label>
										<input
											className="--input error "
											type="text"
											placeholder="Enter email address"
											required
											{...register("email")}
										/>
										<div className="error-message">{errors.email?.message}</div>
									</div>
									<div
										className={
											errors.password?.message
												? "error row px-3 mt-3"
												: "row px-3 mt-3"
										}
									>
										<label className="mb-1">
											<h6 className="mb-0 text-sm">Password</h6>
										</label>
										<input
											className="--input"
											type="password"
											name="password"
											placeholder="Enter password"
											{...register("password")}
										/>
										<div className="error-message">
											{errors.password?.message}
										</div>
									</div>
									<div className="row px-3 mb-4"></div>
									<div className="row mb-3 px-3">
										<button type="submit" className="btn btn-blue text-center">
											Register
										</button>
									</div>
									<div className="row mb-4 px-3">
										<small className="font-weight-bold">
											Do you have an account?{" "}
											<Link className="text-danger" to="register">
												Login
											</Link>
										</small>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Login;
