import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import AssignmentDeleter from "./AssignmentDeleter";
import FacultyProtected from "../../Account/FacultyProtected";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <AssignmentsControls /><br /><br /><br /><br />
            <ListGroup className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentControlButtons />
                </div>
                <ListGroup className="wd-lessons rounded-0">
                    {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
                        <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <TfiWrite onClick={() => navigate(`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`)} className="me-4 fs-3 text-success" />
                            <div className="flex-grow-1">
                                <h2 className="wd-assignment-link text-decoration-none text-reset fw-bold fs-4">
                                    {assignment.title}
                                </h2>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00 am |
                                <br />
                                <b>Due</b> May 13 at 11:59 pm | 100 pts
                            </div>
                            <FacultyProtected>
                                <FaTrash className="text-danger me-2 mb-1" onClick={handleShow} />
                            </FacultyProtected>
                            <LessonControlButtons />
                            <AssignmentDeleter show={show} handleClose={handleClose} dialogTitle="Are you sure?" assignmentId={assignment._id} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ListGroup>
        </div>
    );
}