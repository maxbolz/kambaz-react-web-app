import { FormGroup, FormControl, FormLabel, FormSelect, FormCheck, Button, Row, Col } from "react-bootstrap";
import AssignmentsControlsFooter from "./AssignmentsControlsFooter";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AssignmentEditor() {
    const { aid } = useParams();
    const [assignment, setAssignment] = useState<any>({});
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const [alreadyExists, setAlreadyExists] = useState(false);

    useEffect(() => {
        const curAssignment = assignments.find((a: any) => a._id === aid);
        if (curAssignment) {
            setAssignment(curAssignment);
            setAlreadyExists(true);
        }
    }, [aid, assignments]);

    return (
        <div>
            <FormGroup className="mb-4" controlId="wd-assignment-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl type="text" value={assignment.title}
                    onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
            </FormGroup>
            <FormGroup className="mb-4">
                <FormControl as="textarea" rows={9} value={assignment.description}
                    onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
            </FormGroup>
            <div className="container">
                <div className="d-flex flex-column align-items-end">
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Points</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value={assignment.points}
                                onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
                        </Col>
                    </Row>
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Assignment Group</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormSelect>
                                <option selected>ASSIGNMENTS</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Display Grade as</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormSelect>
                                <option selected>Percentage</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Submission Type</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className="border p-3 rounded-2">
                                <FormSelect className="mb-4"><option selected>Online</option></FormSelect>
                                <FormLabel className="fw-bold">Online Entry Options</FormLabel>
                                <FormCheck label="Text Entry" />
                                <FormCheck label="Website URL" />
                                <FormCheck label="Media Recordings" />
                                <FormCheck label="Student Annotation" />
                                <FormCheck label="File Uploads" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Assign</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className="border p-3 rounded-2">
                                <FormLabel className="fw-bold">Assign to</FormLabel>
                                <div className="border p-1 rounded-2 mb-4">
                                    <Button variant="primary bg-secondary border-0 text-black">
                                        Everyone <RxCross2 className="ms-3" />
                                    </Button>
                                </div>
                                <FormLabel className="fw-bold">Due</FormLabel>
                                <FormControl type="date" value={assignment.due} className="mb-4"
                                    onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
                                <Row>
                                    <Col xs={6}>
                                        <FormLabel className="fw-bold text-nowrap">Available from</FormLabel>
                                        <FormControl type="date" value={assignment.from}
                                            onChange={(e) => setAssignment({ ...assignment, from: e.target.value })} />
                                    </Col>
                                    <Col xs={6}>
                                        <FormLabel className="fw-bold text-nowrap">Until</FormLabel>
                                        <FormControl type="date" value={assignment.to}
                                            onChange={(e) => setAssignment({ ...assignment, to: e.target.value })} />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />
            <AssignmentsControlsFooter assignment={assignment} alreadyExists={alreadyExists}/>
        </div>
    );
}