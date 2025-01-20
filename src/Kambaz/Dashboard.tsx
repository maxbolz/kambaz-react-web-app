import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3800/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/theory.jpg" width={200} />
                        <div>
                            <h5> CS3800 </h5>
                            <p className="wd-dashboard-course-title">
                                Theory of Computation  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/4550/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/webdev.jpg" width={200} />
                        <div>
                            <h5> CS4550 </h5>
                            <p className="wd-dashboard-course-title">
                                Web Development  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2310/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/comparch.jpg" width={200} />
                        <div>
                            <h5> EECE2310 </h5>
                            <p className="wd-dashboard-course-title">
                                Computer Architecture  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3302/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/writing.jpg" width={200} />
                        <div>
                            <h5> ENGW3302 </h5>
                            <p className="wd-dashboard-course-title">
                                Advanced Writing in Tech  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2500/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/gamedesign.jpg" width={200} />
                        <div>
                            <h5> GAME2500 </h5>
                            <p className="wd-dashboard-course-title">
                                Foundations of Game Design  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2102/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/bostonography.jpg" width={200} />
                        <div>
                            <h5> INSH2102 </h5>
                            <p className="wd-dashboard-course-title">
                                Bostonography  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}