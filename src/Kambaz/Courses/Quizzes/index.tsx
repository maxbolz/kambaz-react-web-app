import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle, FaRocket } from "react-icons/fa";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { setQuizzes } from "../Quizzes/reducer";
import * as courseClient from "../client";
import * as quizzesClient from "./client";
import Score from "./Score";

export default function Quizzes() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const foundQuizzes = currentUser.role === "STUDENT" ? quizzes.filter((quiz: any) => quiz.published) : quizzes;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showRocket, setShowRocket] = useState<{ [quizId: string]: boolean }>({});

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC"
        }).format(new Date(dateString));
    };

    const checkAvailable = (quiz: any) => {
        const now = Date.now();
        const availableTime = new Date(quiz.available).getTime();
        const untilTime = new Date(quiz.until).getTime();

        if (now < availableTime) {
            return "Not available until " + formatDate(quiz.available);
        } else if (now > untilTime) {
            return "Closed";
        } else {
            return "Available";
        }
    };

    const fetchData = async () => {
        const foundQuizzes = await courseClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(foundQuizzes));

        const rocketStatus: { [quizId: string]: boolean } = {};
        for (const quiz of foundQuizzes) {
            const foundResponses = await quizzesClient.findResponse(currentUser._id, quiz._id);
            const attemptsAllowed = quiz.multipleAttempts ? 3 : 1;
            rocketStatus[quiz._id] = foundResponses.length < attemptsAllowed;
        }
        setShowRocket(rocketStatus);
    };
    useEffect(() => {
        fetchData();
    }, [cid]);

    return (
        <div>
            <QuizControls /><br /><br /><br /><br />
            <ListGroup className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
                </div>
                <ListGroup className="wd-lessons rounded-0">
                    {foundQuizzes.map((quiz: any) => (
                        <ListGroup.Item key={quiz._id} className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            {showRocket[quiz._id] ? (
                                <FaRocket
                                    onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`)}
                                    className="me-4 fs-3 text-success"
                                />
                            ) :
                                <FaCheckCircle
                                    onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/Results`)}
                                    className="me-4 fs-3 text-success"></FaCheckCircle>}
                            <div className="flex-grow-1">
                                <h2 className="wd-quiz-link text-decoration-none text-reset fw-bold fs-4">
                                    {quiz.title}
                                </h2>
                                <span className="text-danger">{checkAvailable(quiz)}</span> | <b>Due</b> {formatDate(quiz.due)} | <b>{quiz.questions.reduce((total: number, question: any) => total + question.points, 0)}</b> pts | <b>{quiz.questions.length}</b> Questions | <b>{quiz.multipleAttempts ? `${quiz.attempts} Attempts Allowed` : "1 Attempt Allowed"}</b>
                            </div>
                            <QuizControlButtons quiz={quiz} />
                            <Score user={currentUser} quiz={quiz} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ListGroup>
        </div>
    );
}