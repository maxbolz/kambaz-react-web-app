import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> CS1234 React JS </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Full Stack software developer  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/3800/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/theory.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> CS3800 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Theory of Computation  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/4550/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/webdev.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> CS4550 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Web Development  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/2310/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/comparch.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> EECE2310 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Computer Architecture  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/3302/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/writing.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> ENGW3302 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Advanced Writing in Tech  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/2500/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/gamedesign.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> GAME2500 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Foundations of Game Design  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card className="shadow">
                            <Link to="/Kambaz/Courses/2102/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/bostonography.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="text-primary"> INSH2102 </Card.Title>
                                    <Card.Text className="wd-dashboard-course-title text-secondary">
                                        Bostonography  </Card.Text>
                                    <Button variant="primary"> Go </Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}