import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCourse, updateCourse, deleteCourse, editCourse } from "./Courses/reducer";
import FacultyProtected from "./Account/FacultyProtected";
import StudentProtected from "./Account/StudentProtected";
import { addEnrollment, deleteEnrollment } from "./reducer";
import { useNavigate } from "react-router";

export default function Dashboard() {

    const [enrollmentStatus, setEnrollmentStatus] = useState(false);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.courseReducer);
    const filteredCourses = courses.filter((course: any) => enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id) || enrollmentStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [curCourse, setCurCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const [courseName, setCourseName] = useState(curCourse.name);
    const [courseDescription, setCourseDescription] = useState(curCourse.description);

    const updateCourseWithCheck = () => {
        if (!curCourse)
            return;
        dispatch(updateCourse({ ...curCourse, name: courseName, description: courseDescription, editing: false }));
    };

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
                <StudentProtected>
                    <Button onClick={() => setEnrollmentStatus(!enrollmentStatus)} variant="primary" className="btn-lg"> Enrollments </Button>
                </StudentProtected>
            </div>
            <hr />
            <FacultyProtected>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>New Course</h5>
                    <div>
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={() => dispatch(addCourse({ name: courseName, description: courseDescription }))} > Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourseWithCheck} id="wd-update-course-click">
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
            </FacultyProtected>
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {filteredCourses.map((course: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <div className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden text-primary fw-bold">
                                            {course.name} </Card.Title>
                                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            {course.description} </Card.Text>
                                        <Button variant="primary" onClick={() => {
                                            if (enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id))
                                                navigate(`/Kambaz/Courses/${course._id}/Home`)
                                        }}> Go </Button>
                                        <FacultyProtected>
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
                                        </FacultyProtected>
                                        <StudentProtected>
                                            <StudentProtected>
                                                {enrollmentStatus && (
                                                    enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id) ? (
                                                        <Button onClick={(event) => {
                                                            event.preventDefault();
                                                            const enrollmentToDelete = enrollments.find((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id);
                                                            dispatch(deleteEnrollment(enrollmentToDelete._id))
                                                        }} className="btn btn-danger float-end" id="wd-delete-course-click">
                                                            Unenroll
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(addEnrollment({ user: currentUser._id, course: course._id }));
                                                        }} className="btn btn-success float-end" id="wd-delete-course-click">
                                                            Enroll
                                                        </Button>
                                                    )
                                                )}
                                            </StudentProtected>
                                        </StudentProtected>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}