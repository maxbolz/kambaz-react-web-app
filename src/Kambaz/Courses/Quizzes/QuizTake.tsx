import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { setQuizzes } from "./reducer";
import { addResponse } from "./responsesReducer";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { FormControl, FormCheck, Button } from "react-bootstrap";

export default function QuizTake() {

    const { cid, qid } = useParams();
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchQuiz = async () => {
        const foundQuiz = await quizzesClient.findQuizById(quiz._id);
        dispatch(setQuizzes(foundQuiz));
    }
    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const submitResponse = async () => {
        const attempts = await quizzesClient.findResponse(currentUser._id, quiz._id);
        if (!cid) return;
        const newResponse = {
            course: cid,
            user: currentUser._id,
            questions: quiz.questions,
            answers: response.answers,
            attempt: attempts.length + 1,
        };
        const createdResponse = await coursesClient.createResponseForQuiz(quiz._id, newResponse);
        dispatch(addResponse(createdResponse));
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    return (
        <div className="container">
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
            <Button variant="secondary" onClick={submitResponse}>
                Submit
            </Button>
        </div>
    );
}