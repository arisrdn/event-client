import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import {
	Container,
	Table,
	Pagination,
	InputGroup,
	FormControl,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

// Configs.
import { API } from "../../config/api";

const Dashboard = ({
	initEvent,
	event,
	searchId,
	searchTitle,
	searchLocation,
	searchNote,
	searchParticipants,
}) => {
	// States.
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	const query = new URLSearchParams(useLocation().search);
	const [page, setPage] = useState(parseInt(query.get("page")));
	if (!page) {
		setPage(1);
	}

	// Get events.
	const getEvents = async () => {
		try {
			const res = await API.get("/events");
			const { data } = res.data;
			initEvent(data.events, data.events.length);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getEvents();
	}, []);

	// Renders.
	const renderRows = () =>
		event.filtered
			.slice(page * 5 - 5, page * 5)
			.map(({ id, title, location, date, participants, note }) => {
				const temp = new Date(date);
				let dateString = temp.getDay() + " ";
				dateString += temp.getMonth() + " ";
				dateString += temp.getFullYear();
				return (
					<tr key={id}>
						<td>{id}</td>
						<td>{title}</td>
						<td>{location}</td>
						<td>{dateString}</td>
						<td>
							{participants?.map(({ name }) => (
								<div>{name.fullname}</div>
							))}
						</td>
						<td>{note}</td>
					</tr>
				);
			});

	const renderPagination = () => (
		<Pagination style={{ justifyContent: "center" }}>
			{page > 1 && <Pagination.Prev onClick={() => setPage(page - 1)} />}
			{page > 3 && <Pagination.Ellipsis />}

			{page - 2 > 0 && (
				<Pagination.Item onClick={() => setPage(page - 2)}>
					{page - 2}
				</Pagination.Item>
			)}
			{page - 1 > 0 && (
				<Pagination.Item onClick={() => setPage(page - 1)}>
					{page - 1}
				</Pagination.Item>
			)}

			<Pagination.Item active>{page}</Pagination.Item>

			{page + 1 <= event.maxPage && (
				<Pagination.Item onClick={() => setPage(page + 1)}>
					{page + 1}
				</Pagination.Item>
			)}
			{page + 2 <= event.maxPage && (
				<Pagination.Item onClick={() => setPage(page + 2)}>
					{page + 2}
				</Pagination.Item>
			)}

			{event.maxPage >= page + 3 && <Pagination.Ellipsis />}
			{event.maxPage >= page + 1 && (
				<Pagination.Next onClick={() => setPage(page + 1)} />
			)}
		</Pagination>
	);
	return (
		<Container className>
			<InputGroup className="">
				<FormControl
					placeholder="Search..."
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
					type="text"
					name="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<DropdownButton
					as={InputGroup.Append}
					variant="outline-secondary"
					title="Search"
					id="input-group-dropdown-2"
				>
					<Dropdown.Item
						onClick={() => {
							setPage(1);
							searchId(search);
						}}
					>
						ID
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setPage(1);
							searchTitle(search);
						}}
					>
						Title
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setPage(1);
							searchLocation(search);
						}}
					>
						Location
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setPage(1);
							searchParticipants(search);
						}}
					>
						Participant
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setPage(1);
							searchNote(search);
						}}
					>
						Note
					</Dropdown.Item>
				</DropdownButton>
			</InputGroup>
			<Table variant="dark" striped bordered hover responsive>
				<thead>
					<tr>
						<th>No.</th>
						<th>Title</th>
						<th>Location</th>
						<th>Date</th>
						<th>Participant</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>{!loading && renderRows()}</tbody>
			</Table>
			{!loading && renderPagination()}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	event: state.event,
});

const mapDispatchToProps = (dispatch) => {
	return {
		initEvent: (events, length) =>
			dispatch({ type: "INIT", payloads: { events, length } }),
		searchId: (id) => dispatch({ type: "SEARCH_ID", payloads: { id } }),
		searchTitle: (title) =>
			dispatch({ type: "SEARCH_TITLE", payloads: { title } }),
		searchLocation: (location) =>
			dispatch({ type: "SEARCH_LOCATION", payloads: { location } }),
		searchNote: (note) => dispatch({ type: "SEARCH_NOTE", payloads: { note } }),
		searchParticipants: (name) =>
			dispatch({ type: "SEARCH_PARTICIPANT", payloads: { name } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
