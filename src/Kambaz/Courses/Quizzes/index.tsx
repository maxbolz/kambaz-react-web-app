import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { setQuizzes } from "../Quizzes/reducer";
import * as courseClient from "../client";

export default function Quizzes() {

    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
        const foundQuizzes = await courseClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(foundQuizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(dateString));
    };

    const checkAvailable = (quiz: any) => {
        if (Date.now() < new Date(quiz.available).getTime()) {
            return "Not available until " + formatDate(quiz.available);
        }
        else if (Date.now() > new Date(quiz.until).getTime()) {
            return "Closed";
        }
        else {
            return "Available";
        }
    }

    return (
        <div>
            <QuizControls /><br /><br /><br /><br />
            <ListGroup className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
                </div>
                <ListGroup className="wd-lessons rounded-0">
                    {quizzes.map((quiz: any) => (
                        <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaRocket onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`)} className="me-4 fs-3 text-success" />
                            <div className="flex-grow-1">
                                <h2 className="wd-quiz-link text-decoration-none text-reset fw-bold fs-4">
                                    {quiz.title}
                                </h2>
                                <span className="text-danger">{checkAvailable(quiz)}</span> | <b>Due</b> {formatDate(quiz.due)} | <b>{quiz.questions.reduce((total: number, question: any) => total + question.points, 0)}</b> pts | <b>{quiz.questions.length}</b> Questions
                            </div>
                            <QuizControlButtons quiz={quiz}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ListGroup>
        </div>
    );
}