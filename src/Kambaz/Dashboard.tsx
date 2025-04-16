import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FacultyProtected from "./Account/FacultyProtected";
import StudentProtected from "./Account/StudentProtected";
import { useNavigate } from "react-router";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Dashboard() {

    const [enrollmentStatus, setEnrollmentStatus] = useState(false);

    const navigate = useNavigate();

    const [curCourse, setCurCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (enrollmentStatus) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrollmentStatus]);

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(curCourse);
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

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
                <StudentProtected>
                    <Button onClick={async () => {
                        const newStatus = !enrollmentStatus;
                        setEnrollmentStatus(newStatus);
                    }} variant="primary" className="btn-lg"> {enrollmentStatus ? "My Courses" : "All Courses"}
                    </Button>
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
                                            {enrollmentStatus && (
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    updateEnrollment(course._id, !course.enrolled);
                                                }} className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}
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