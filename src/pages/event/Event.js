import { useQuery } from "react-query";
import { API } from "../../config/api";
// import Card from "../../components/cards/Card";

import { Card, Col } from "react-bootstrap";
import { Container, Row, Spinner } from "react-bootstrap";

const LandingPage = () => {
	const { data: dataEvent, isLoading, isError } = useQuery(
		"eventCache",
		async () => {
			const response = await API.get("/events");
			return response.data.data.events;
		}
	);

	console.log("da", dataEvent);

	return (
		<div className="container-fluid ">
			<Container>
				<Row className="d-flex justify-content-around">
					{isLoading ? (
						<Spinner animation="border" variant="secondary" />
					) : (
						<>
							{dataEvent?.map((data) => (
								<Col xs={12} md={6} lg={4} className="mb-4 mr-auto">
									<Card className="card-wrapper">
										<div className="img-wrapper">
											<Card.Img
												variant="top"
												src=" https://dummyimage.com/640x4:3/"
												alt="image"
												className="img-card"
											/>
										</div>
										<Card.Header>
											<Card.Subtitle className="mb-2 text-muted d-flex align-items-center mt-1">
												{data.location}
											</Card.Subtitle>
											<Card.Title>{data.title}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">
												{/* {data.date} */}
											</Card.Subtitle>
										</Card.Header>
										<Card.Body className="d-flex justify-content-center">
											<Row sm={2} className="d-flex align-items-center">
												<Col className="mb-1 mr-auto">
													<div
														className="d-flex align-items-center"
														style={{ fontSize: "14px" }}
													>
														{data.participant?.map((user) => (
															<>
																<img
																	src={`https://ui-avatars.com/api/?rounded=true&name=${user.fullName}`}
																	alt="image profile"
																	style={{ width: "24px", marginRight: "2px" }}
																/>
																{user.fullName}
															</>
														))}
													</div>
												</Col>
											</Row>
										</Card.Body>
										<Card.Footer className="text-muted overflow-auto">
											Note: <br /> {data.note}
										</Card.Footer>
									</Card>
								</Col>
							))}
						</>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
