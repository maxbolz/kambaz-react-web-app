import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import { FormControl, FormCheck, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

export default function QuizPreview() {

    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [response, setResponse] = useState<any>({
        quiz: quiz,
        studentId: currentUser._id,
        answers: quiz?.questions?.map((question: any) => ({
            questionId: question.id,
            answer: ""
        })) || []
    });
    const [score, setScore] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const fetchQuiz = async () => {
        const foundQuiz = await quizzesClient.findQuizById(quiz._id);
        dispatch(setQuizzes(foundQuiz));
    }
    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const getScore = async (response: any) => {
        const totalPoints = quiz.questions.reduce((total: number, question: any) => total + question.points, 0)
        let curPoints = 0;
        for (const question of (quiz.questions || [])) {
            for (const answer of response.answers) {
                if (question.id === answer.questionId && question.correct_answer === answer.answer) {
                    curPoints += question.points;
                }
            }
        }
        setScore(`${curPoints}/${totalPoints}`);
    };

    const submitResponse = async () => {
        if (!cid) return;
        const newResponse = {
            course: cid,
            user: currentUser._id,
            questions: quiz.questions,
            answers: response.answers
        };
        await getScore(newResponse);
        setHasSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container">
            <div className="alert alert-danger mb-4" role="alert">
                <FaExclamationCircle className="me-2" />
                This is a preview of the published version of the quiz.
            </div>
            {hasSubmitted && (
                <h1 className="mb-4 fs-1 fw-bold">Score: {score}</h1>
            )}
            {quiz.questions && (
                quiz.questions.map((question: any, index: number) => (
                    <div key={index} className="border rounded-2 mb-3">
                        <h3 className="fs-4 fw-bold p-3 flex-fill" style={{ backgroundColor: "#eeeeee" }}>
                            Question {index + 1}
                        </h3>
                        <h3 className="p-3 fs-5">
                            {question.question}
                        </h3>
                        {question.type === "fill_in_blank" ? (
                            <div className="p-2">
                                <FormControl
                                    type="text"
                                    onChange={(e) => {
                                        setResponse({
                                            ...response,
                                            answers: response.answers.map((ans: any, i: number) =>
                                                i === index ? { ...ans, answer: e.target.value } : ans
                                            )
                                        });
                                    }}
                                />
                            </div>
                        ) : (
                            <ul className="list-unstyled fs-5 p-3">
                                {question.answers.map((answer: any, optIndex: number) => (
                                    <li key={optIndex} className="mb-2">
                                        <FormCheck
                                            type="radio"
                                            name={`correct-answer-${index}`}
                                            onChange={() => {
                                                setResponse({
                                                    ...response,
                                                    answers: response.answers.map((ans: any, i: number) =>
                                                        i === index ? { ...ans, answer } : ans
                                                    )
                                                });
                                            }}
                                            className="me-2 d-inline-block"
                                        />
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )))}
            <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editor`)} className="me-2">
                Edit Quiz
            </Button>
            <Button variant="danger" onClick={submitResponse}>
                See Score
            </Button>
        </div>
    );
}