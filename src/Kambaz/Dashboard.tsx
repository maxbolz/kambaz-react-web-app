import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCourse, updateCourse, deleteCourse, editCourse } from "./Courses/reducer";
import { enrollments } from "./Database";

export default function Dashboard() {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.courseReducer);
    const filteredCourses = courses.filter((course: any) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === course._id));

    const dispatch = useDispatch();
    const [curCourse, setCurCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const [courseName, setCourseName] = useState(curCourse.name);
    const [courseDescription, setCourseDescription] = useState(curCourse.description);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <div className="d-flex justify-content-between align-items-center">
                <h5>New Course</h5>
                <div>
                    <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={() => dispatch(addCourse({ name: courseName, description: courseDescription }))} > Add </button>
                    <button className="btn btn-warning float-end me-2"
                        onClick={() => {

                            if (!curCourse)
                                return;

                            dispatch(updateCourse({
                                _id: curCourse._id,
                                name: courseName,
                                description: courseDescription,
                                number: curCourse.number,
                                startDate: curCourse.startDate,
                                endDate: curCourse.endDate,
                                department: curCourse.department,
                                credits: curCourse.credits
                            }));

                        }} id="wd-update-course-click">
                        Update
                    </button>
                </div>
            </div>
            <br />
            <FormControl value={courseName} className="mb-2"
                onChange={(e) => setCourseName(e.target.value)} />
            <FormControl as="textarea" value={courseDescription} rows={3}
                onChange={(e) => setCourseDescription(e.target.value)} />
            <hr /><br />
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {filteredCourses.map((course: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden text-primary fw-bold">
                                            {course.name} </Card.Title>
                                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            {course.description} </Card.Text>
                                        <Button variant="primary"> Go </Button>
                                        <Button onClick={(event) => {
                                            event.preventDefault();
                                            dispatch(deleteCourse(course._id));
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </Button>
                                        <Button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                dispatch(editCourse(course._id));
                                                setCurCourse(course);
                                                setCourseName(course.name);
                                                setCourseDescription(course.description);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
                                        </Button>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}