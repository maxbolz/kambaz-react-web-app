import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
export default function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { pathname } = useLocation();
    return (
        <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 me-5 rounded-0">
            {links.map((link) => (
                <Link to={`${pathname.split("/").slice(0, 4).join("/")}/${link}`}  id="wd-course-home-link" className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>{link}</Link>
            ))}
        </ListGroup>
    );
}