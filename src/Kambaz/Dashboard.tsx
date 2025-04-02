import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FacultyProtected from "./Account/FacultyProtected";
import StudentProtected from "./Account/StudentProtected";
import { setEnrollments, addEnrollment, deleteEnrollment } from "./reducer";
import { useNavigate } from "react-router";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./client";

export default function Dashboard() {

    const [enrollmentStatus, setEnrollmentStatus] = useState(false);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [curCourse, setCurCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchCourses = async (fetchAllCourses: boolean = enrollmentStatus) => {
        try {
            const courses = fetchAllCourses ? await courseClient.fetchAllCourses() : await userClient.findMyCourses();
            setCourses(courses);
            const foundEnrollments = await enrollmentClient.findAllEnrollments();
            dispatch(setEnrollments(foundEnrollments));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(curCourse);
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async () => {
        await courseClient.updateCourse(curCourse);
        setCourses(courses.map((c) => {
            if (c._id === curCourse._id) { return curCourse; }
            else { return c; }
        }));
    };

    const enroll = async (event: any, cid: string) => {
        event.preventDefault();
        await enrollmentClient.enrollUser(currentUser._id, cid);
        dispatch(addEnrollment({ user: currentUser._id, course: cid }));
    };

    const unenroll = async (event: any, cid: string) => {
        event.preventDefault();
        await enrollmentClient.unenrollUser(currentUser._id, cid);
        const enrollmentToDelete = enrollments.find((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === cid);
        dispatch(deleteEnrollment(enrollmentToDelete._id))
    };

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
                <StudentProtected>
                    <Button onClick={async () => {
                        const newStatus = !enrollmentStatus;
                        setEnrollmentStatus(newStatus);
                        await fetchCourses(newStatus);
                    }} variant="primary" className="btn-lg"> Enrollments </Button>
                </StudentProtected>
            </div>
            <hr />
            <FacultyProtected>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>New Course</h5>
                    <div>
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse} > Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </div>
                </div>
                <br />
                <FormControl value={curCourse.name} className="mb-2"
                    onChange={(e) => setCurCourse({ ...curCourse, name: e.target.value })} />
                <FormControl as="textarea" value={curCourse.description} rows={3}
                    onChange={(e) => setCurCourse({ ...curCourse, description: e.target.value })} />
                <hr /><br />
            </FacultyProtected>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course: any) => (
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
                                                deleteCourse(course._id);
                                            }} className="btn btn-danger float-end"
                                                id="wd-delete-course-click">
                                                Delete
                                            </Button>
                                            <Button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCurCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end" >
                                                Edit
                                            </Button>
                                        </FacultyProtected>
                                        <StudentProtected>
                                            <StudentProtected>
                                                {enrollmentStatus && (
                                                    enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id) ? (
                                                        <Button onClick={(event) => { unenroll(event, course._id) }} className="btn btn-danger float-end" id="wd-delete-course-click">
                                                            Unenroll
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={(event) => { enroll(event, course._id) }} className="btn btn-success float-end" id="wd-delete-course-click">
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