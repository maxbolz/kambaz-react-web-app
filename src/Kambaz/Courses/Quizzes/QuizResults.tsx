import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export default function QuizResults() {

    const { qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [myAttempt, setMyAttempt] = useState<any>();
    const [score, setScore] = useState("");
    const dispatch = useDispatch();

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

    const fetchQuiz = async () => {
        const foundQuiz = await quizzesClient.findQuizById(quiz._id);
        dispatch(setQuizzes(foundQuiz));
    }
    const fetchAttempt = async () => {
        const attempts = await quizzesClient.findResponse(currentUser._id, qid);
        if (attempts?.length) {
            setMyAttempt(attempts[attempts.length - 1]);
        }
    }

    useEffect(() => {
        fetchQuiz();
        fetchAttempt();
        getScore(myAttempt);
    }, [qid, myAttempt]);

    const gotRight = (question: any) => {
        if (!myAttempt) return false;
        const userAnswer = myAttempt.answers.find((ans: any) => ans.questionId === question.id)?.answer;
        return question.correct_answer === userAnswer;
    };

    return (
        <div className="container">
            <div className="alert alert-danger mb-4" role="alert">
                <FaExclamationCircle className="me-2" />
                You cannot retake this quiz.
            </div>
            <h1 className="mb-4 fs-1 fw-bold">Score: {score}</h1>
            {quiz.questions && (
                quiz.questions.map((question: any, index: number) => (
                    <div key={index} className="border rounded-2 mb-3">
                        <h3 className="fs-4 fw-bold p-3 d-flex align-items-center" style={{ backgroundColor: "#eeeeee" }}>
                            {gotRight(question) ? (
                                <FaCheckCircle className="me-4 fs-3 text-success" />
                            ) : (
                                <FaCircleXmark className="me-4 fs-3 text-danger" />
                            )}
                            Question {index + 1}
                        </h3>
                        <h3 className="p-3 fs-5">
                            {question.question}
                        </h3>
                        {question.type === "fill_in_blank" ? (
                            <div className="p-2 fs-4 ms-2">
                                <span className="text-success">
                                    Correct Answer: <b>{question.correct_answer}</b>
                                </span>
                                <br />
                                <span className={myAttempt?.answers.find((answer: any) => answer.questionId === question.id)?.answer === question.correct_answer ? "text-success" : "text-danger"}>
                                    Your Answer: <b>{myAttempt?.answers.find((answer: any) => answer.questionId === question.id)?.answer}</b>
                                </span>
                            </div>
                        ) : (
                            <ul className="list-unstyled fs-4 p-3 ms-2">
                                {question.answers.map((answer: any, optIndex: number) => (
                                    <li key={optIndex}
                                        className={`mb-2 ${question.correct_answer === answer
                                            ? "text-success"
                                            : myAttempt?.answers.find((answer: any) => answer.questionId === question.id)?.answer === answer
                                                ? "text-danger"
                                                : ""
                                            }`}>
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )))}
        </div>
    );
}