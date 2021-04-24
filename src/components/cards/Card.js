// import React from "react";

// import "./card.css";
// // Components.
// import UserCard from "./UserCard";

// const Card = ({ img, location, title, date, note, participants }) => {
// 	const renderNameTags = () =>
// 		participants.map(({ name }) => <UserCard name={name} />);
// 	return (
// 		<div className="card">
// 			<div className="image">
// 				<img src={img} alt={img} />
// 			</div>
// 			<div className="head">
// 				<div className="location">
// 					<div className="icon">
// 						{/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}
// 					</div>
// 					<div className="address">{location}</div>
// 				</div>
// 				<div className="title">{title}</div>
// 				<div className="date">{date}</div>
// 			</div>
// 			{/* <div className="participants">{renderNameTags()}</div> */}
// 			<div className="note">
// 				<div className="label">Note :</div>
// 				<div className="content">{note}</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Card;

import { Card, Col, Row } from "react-bootstrap";

// import ImageCard from "../../Assets/Images/img-card.svg";
// import Marker from "../../Assets/Images/marker.png";
// import Participant from "../../Assets/Images/participant.png";

const CardEvent = ({ data }) => {
	const { title, location, participant, date, note, image } = data;
	return (
		<div className="card-event">
			<Col className="mb-4 mr-auto">
				<Card className="card-wrapper">
					<div className="img-wrapper">
						<Card.Img
							// variant="top"
							// src={image ? image : ImageCard}
							// alt={image ? image : ImageCard}
							className="img-card"
						/>
					</div>
					<Card.Header>
						<Card.Subtitle className="mb-2 text-muted d-flex align-items-center mt-1">
							<img
								// src={Marker}
								alt="Image Card"
								style={{ width: "18px", marginRight: "5px" }}
							/>
							{location}
						</Card.Subtitle>
						<Card.Title>{title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
					</Card.Header>
					<Card.Body className="d-flex justify-content-center">
						<Row sm={2} className="d-flex align-items-center">
							<Col className="mb-1 mr-auto">
								<div
									className="d-flex align-items-center"
									style={{ fontSize: "14px" }}
								>
									<img
										// src={Participant}
										alt="image profile"
										style={{ width: "24px", marginRight: "2px" }}
									/>
									{participant}
								</div>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className="text-muted overflow-auto">
						Note: <br /> {note}
					</Card.Footer>
				</Card>
				<div className="card">
					//{" "}
					<div className="image">
						{/* // <img src={img} alt={img} /> */}
						//{" "}
					</div>
					//{" "}
					<div className="head">
						//{" "}
						<div className="location">
							//{" "}
							<div className="icon">
								// {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}
								//{" "}
							</div>
							// <div className="address">{location}</div>
							//{" "}
						</div>
						// <div className="title">{title}</div>
						// <div className="date">{date}</div>
						//{" "}
					</div>
					// {/* <div className="participants">{renderNameTags()}</div> */}
					//{" "}
					<div className="note">
						// <div className="label">Note :</div>
						// <div className="content">{note}</div>
						//{" "}
					</div>
					//{" "}
				</div>
			</Col>
		</div>
	);
};

export default CardEvent;
