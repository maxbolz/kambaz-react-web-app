import { Modal, Button } from "react-bootstrap";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import * as assignmentsClient from "./client";

export default function AssignmentDeleter({ show, handleClose, dialogTitle, assignmentId }: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    assignmentId: string;
}) {

    const dispatch = useDispatch();

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {assignmentId} Are you sure you want to delete this assignment? This action cannot be undone. 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                <Button variant="danger"
                    onClick={() => removeAssignment(assignmentId)} > Delete </Button>
            </Modal.Footer>
        </Modal>
    );
}