import { FormGroup, FormControl, FormLabel, FormSelect, FormCheck, Button, Row, Col } from "react-bootstrap";
import AssignmentsControlsFooter from "./AssignmentsControlsFooter";
import { RxCross2 } from "react-icons/rx";

export default function AssignmentEditor() {
    return (
        <div>
            <FormGroup className="mb-4" controlId="wd-assignment-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl type="text" value="A1 - ENV + HTML" />
            </FormGroup>
            <FormGroup className="mb-4">
                <FormControl as="textarea" rows={9} value="The assignment is available online 
                
Submit a link to the landing page of your Web application running on Netlify. 

The landing page should include the following: 
        •   Your full name and section Links to the Kambaz application 
        •   Links to all relevant source code repositories 

The Kambaz application should include a link to navigate back to the landing page." />
            </FormGroup>
            <div className="container">
                <div className="d-flex flex-column align-items-end">
                    <Row className="mb-4 w-100">
                        <Col xs={4} className="text-end">
                            <FormLabel className="me-2 mb-0 text-nowrap">Points</FormLabel>
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" value="100" />
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
                                <FormControl type="date" value="2024-05-13" className="mb-4" />
                                <Row>
                                    <Col xs={6}>
                                        <FormLabel className="fw-bold text-nowrap">Available from</FormLabel>
                                        <FormControl type="date" value="2024-05-06" />
                                    </Col>
                                    <Col xs={6}>
                                        <FormLabel className="fw-bold text-nowrap">Until</FormLabel>
                                        <FormControl type="date" value="2024-05-20" />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />
            <AssignmentsControlsFooter />
        </div>
    );
}