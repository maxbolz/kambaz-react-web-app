import { Button } from "react-bootstrap";

export default function AssignmentsControlsFooter() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Save
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Cancel
            </Button>
        </div>
    );
}