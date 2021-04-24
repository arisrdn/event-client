import { Modal } from "react-bootstrap";
// import Map from "./Map";
import Map from "./Map";

function ModalMap(props) {
	return (
		<div className="">
			<Modal
				{...props}
				// show
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Select Map</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: "500px" }}>
					<Map>{props.children}</Map>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
}
export default ModalMap;
