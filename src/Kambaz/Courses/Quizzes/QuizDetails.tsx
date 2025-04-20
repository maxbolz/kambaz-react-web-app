import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

export default function QuizDetails() {

    const { qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    if (!quiz) return;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchQuiz = async () => {
        const foundQuiz = await quizzesClient.findQuizById(quiz._id);
        dispatch(setQuizzes(foundQuiz));
    }
    useEffect(() => {
        fetchQuiz();
    }, [quiz._id]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        }).format(new Date(dateString));
    };

    return (
        <div>
            <div className="d-flex justify-content-center mb-3">
                <Button variant="secondary" size="lg" className="me-1" id="wd-add-module-btn"
                    onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/Preview`)}>
                    <FaEye className="position-relative me-2" style={{ bottom: "1px" }} />
                    Preview
                </Button>
                <Button variant="secondary" size="lg" className="me-1" id="wd-add-module-btn"
                    onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/Editor`)}>
                    <TfiWrite className="position-relative me-2" style={{ bottom: "1px" }} />
                    Edit
                </Button>
            </div>
            <div className="border border-2 rounded-3 p-4 mb-5">
                <h1 className="me-4 fs-2 mb-1">
                    {quiz.title}
                </h1>
                <br />
                <table className="table w-50 table-borderless">
                    <tbody>
                        <tr>
                            <td className="text-end"><b>Quiz Type</b></td>
                            <td>{quiz.quizType}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Points</b></td>
                            <td>{quiz.questions.reduce((total: number, question: any) => total + question.points, 0)}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Assignment Group</b></td>
                            <td>{quiz.assignmentGroup}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Shuffle Answers</b></td>
                            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Time Limit</b></td>
                            <td>{quiz.timeLimit}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Multiple Attempts</b></td>
                            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>View Responses</b></td>
                            <td>Always</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Show Correct Answers</b></td>
                            <td>{quiz.showCorrectAnswers}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>One Question at a Time</b></td>
                            <td>{quiz.oneAtATime ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Require Lockdown</b></td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Required to View Quiz Results</b></td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Webcam Required</b></td>
                            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="text-end"><b>Lock Questions After Answering</b></td>
                            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <table className="w-100 text-start">
                    <thead className="border-0 border-bottom border-2">
                        <tr>
                            <th><h2 className="fs-5 fw-bold">Due</h2></th>
                            <th><h2 className="fs-5 fw-bold">For</h2></th>
                            <th><h2 className="fs-5 fw-bold">Available from</h2></th>
                            <th><h2 className="fs-5 fw-bold">Until</h2></th>
                        </tr>
                    </thead>
                    <div className="mb-2" />
                    <tbody>
                        <tr>
                            <td>{formatDate(quiz.due)}</td>
                            <td>Everyone</td>
                            <td>{formatDate(quiz.available)}</td>
                            <td>{formatDate(quiz.until)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}