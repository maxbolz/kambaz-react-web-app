import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Button, FormGroup, FormControl } from "react-bootstrap";

export default function AssignmentsControls() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <FormGroup className="me-1 float-start position-relative d-flex align-items-center" id="wd-add-module-btn">
                <CiSearch className="position-absolute ms-3 text-secondary" size={25} />
                <FormControl type="text" size="lg" placeholder="Search..." className="w-auto ps-5 py-2" />
            </FormGroup>
            <div>
                <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </Button>
                <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
                </Button>
            </div>
        </div>
    );
}