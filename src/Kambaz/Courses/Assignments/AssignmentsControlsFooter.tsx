import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import * as coursesClient from "../client"
import * as assignmentsClient from "./client";

export default function AssignmentsControlsFooter({ assignment, alreadyExists }: any) {

    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const returnBack = () => {
        if (alreadyExists) {
            saveAssignment(assignment);
        }
        else {
            createAssignmentForCourse();
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = {
            title: assignment.title,
            course: cid,
            description: assignment.description,
            points: assignment.points,
            due: assignment.due,
            from: assignment.from,
            to: assignment.to
        };
        const createdAssignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        dispatch(addAssignment(createdAssignment));
    };

    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <Button onClick={returnBack} variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Save
            </Button>
            <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)} variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Cancel
            </Button>
        </div>
    );
}