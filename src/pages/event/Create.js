import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import img from "../../assets/img/undraw_Co_workers_re_1i6i.svg";

import { useState, useEffect, useContext, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../contexts/authContext";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import MultiSelect from "react-multi-select-component";
import AsyncSelect from "react-select/async";
import Maps from "../../components/modals/Maps";
import Pin from "../../components/modals/Pin";

const schema = yup.object().shape({
	title: yup.string().required(),
	date: yup.string().required(),
	location: yup.string().required(),

	note: yup.string().min(50).required(),
});

const Create = () => {
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
		console.log(data);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			title: data.title,
			date: data.date,
			location: data.location,
			participants: selected,
			note: data.note,
			image: "ss",
		});

		const response = await API.post("/event", body, config);

		console.log("res-akhir", response.data?.data?.user?.token);

		router.push("/event");
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
	// MAPS
	const [place, setPlace] = useState("");

	const [modalShow, setModalShow] = useState(false);
	const [address, setAddress] = useState("");
	const [location, setLocation] = useState("");

	const [marker, setMarker] = useState({
		longitude: 106.91905,
		latitude: -6.9123,
	});
	const [events, logEvents] = useState({});

	const onMarkerDragEnd = useCallback((event) => {
		logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
		setMarker({
			longitude: event.lngLat[0],
			latitude: event.lngLat[1],
		});
	}, []);
	const fetchLocation = async () => {
		const token =
			"pk.eyJ1IjoiaWxoYW0yNSIsImEiOiJja20yczc0dm0zOWczMndwMzVmdmJ1bjI4In0.1l2Zgxjy5R0iW2SlySO_fQ";
		const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=${token}`;

		const api = await fetch(apiUrl);
		const response = await api.json();

		if (response?.features) {
			setPlace(response?.features[0]?.text);
			setAddress(response?.features[0]?.place_name);
		}
	};

	// console.log("asas", onMarkerDragEnd)
	useEffect(() => {
		fetchLocation();
	}, [location]);

	//user
	const {
		data: dataUser,
		loading: loadingUser,
		error: errorUser,
		refetch: rfUser,
	} = useQuery("itemChace", async () => {
		const response = await API.get(`/users`);

		return response?.data?.data;
	});
	const [selected, setSelected] = useState([]);
	const [options, setOptions] = useState([
		{ label: "user1", value: "1" },
		{ label: "user2", value: "2" },
		{ label: "user3", value: "3" },
		{ label: "user4", value: "4" },
		{ label: "user5", value: "5" },
	]);
	// console.log(selected);

	dataUser?.users?.map((item, index) => {});
	// let options = [];
	let option = dataUser?.users?.map(function (city) {
		return { value: city.fullName, label: city.fullName };
	});

	const promiseOptions = (inputValue) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	useEffect(() => {
		// setOptions(
		// 	dataUser?.users?.map(function (city) {
		// 		return { value: city.fullName, label: city.fullName };
		// 	})
		// );
	}, [dataUser?.users]);

	console.log("sasa", selected);
	return (
		<>
			<Container className="container">
				<Row className="no-gutters">
					<Col md={6}>
						<div className="leftContent">
							<Col>
								<Form onSubmit={handleSubmit(onSubmit.mutate)}>
									<Row>
										<Col xs={12} lg={6}>
											<Form.Group
												className={errors.title?.message ? "error" : ""}
											>
												<Form.Control
													className="input-bg input-bg2"
													{...register("title")}
													type="text"
													placeholder="Tittle"
													required
												/>
												<div className="error-message">
													{errors.title?.message}
												</div>
											</Form.Group>
										</Col>
										<Col xs={12} lg={6}>
											<Form.Group
												className={errors.date?.message ? "error" : ""}
											>
												<Form.Control
													className="input-bg input-bg2"
													{...register("date")}
													type="date"
													placeholder="date"
													required
												/>
											</Form.Group>
											<div className="error-message">
												{errors.date?.message}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12} lg={9}>
											<Form.Group
												className={errors.location?.message ? "error" : ""}
											>
												<Form.Control
													className="input-bg input-bg2"
													{...register("location")}
													type="text"
													defaultValue={place}
													placeholder="Location"
													required
												/>
											</Form.Group>
											<div className="error-message">
												{errors.location?.message}
											</div>
										</Col>
										<Col xs={12} lg={3}>
											<Form.Group>
												<Button
													onClick={() => setModalShow(true)}
													variant=""
													className="btn-block"
												>
													Map <i class="fa fa-map" aria-hidden="true"></i>
												</Button>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<Form.Group
												className={errors.participant?.message ? "error" : ""}
											>
												<MultiSelect
													options={options}
													value={selected}
													onChange={setSelected}
													labelledBy="Participant"
													selectSomeItems="participant"
												/>
												{/* <AsyncSelect
													isMulti
													cacheOptions
													defaultOptions
													loadOptions={promiseOptions}
												/>
												<Form.Control
													className="input-bg input-bg2"
													{...register("participant")}
													// value={selected}
													placeholder="Participant"
													required
												/> */}
											</Form.Group>
											<div className="error-message">
												{errors.participant?.message}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<Form.Group
												className={errors.note?.message ? "error" : "error"}
											>
												<Form.Control
													as="textarea"
													rows={5}
													className="input-bg input-bg2"
													{...register("note")}
													type="text"
													placeholder="Note"
													required
												/>
											</Form.Group>
											<div className="error-message">
												{errors.note?.message}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<Form.Group>
												<input
													id="file"
													{...register("imageFile")}
													type="file"
												/>
											</Form.Group>
											<div className="error-message">
												{errors.imageFile?.message}
											</div>
										</Col>
									</Row>
									<Row className="mt-2">
										<Col xs={12} lg={12} className="text-right">
											<Button variant="blue" className="w-25" type="submit">
												Save
											</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</div>
					</Col>
					<Col md={6}>
						<div className="rightContent">
							<Image className="image" src={img} alt="meeting" />
						</div>
					</Col>
				</Row>
			</Container>

			<Maps
				show={modalShow}
				onHide={() => setModalShow(false)}
				children={
					<>
						<Marker
							longitude={marker.longitude}
							latitude={marker.latitude}
							offsetTop={-20}
							offsetLeft={-10}
							draggable
							onDragEnd={onMarkerDragEnd}
						>
							<Pin size={20} />
						</Marker>
						<div
							className="shadow p-3 overflow-auto"
							style={{
								width: "400px",
								height: "150px",
								position: "absolute",
								left: "50%",
								bottom: "0",
								backgroundColor: "white",
								transform: "translateX(-50%)",
								borderRadius: "5px",
							}}
						>
							<Row className="mb-2">
								<Col>
									<h5 className="font-weight-bold text-center mb-0">
										Select location
									</h5>
								</Col>
							</Row>
							<Row className="mb-3">
								<Col lg={2}></Col>
								<Col lg={10}>
									<Row>
										<Col lg={12}></Col>

										<Col lg={12} style={{ lineHeight: "1" }}>
											<small className="text-sm">{address}</small>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col>
									<Button
										// onClick={handleMapClose}
										variant="brown"
										className="w-100"
										onClick={() => setModalShow(false)}
									>
										Confirm Location
									</Button>
								</Col>
							</Row>
						</div>
					</>
				}
			/>
		</>
	);
};

export default Create;
