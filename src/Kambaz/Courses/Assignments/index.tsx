import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { useParams, useLocation, Link } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    const { pathname } = useLocation();
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
                            <TfiWrite className="me-4 fs-3 text-success" />
                            <div className="flex-grow-1">
                                <Link to={`${pathname}/${assignment._id}`} className="wd-assignment-link text-decoration-none text-reset fw-bold fs-4">
                                    {assignment._id}
                                </Link>
                                <br />
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00 am |
                                <br />
                                <b>Due</b> May 13 at 11:59 pm | 100 pts
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </ListGroup>
        </div>
    );
}