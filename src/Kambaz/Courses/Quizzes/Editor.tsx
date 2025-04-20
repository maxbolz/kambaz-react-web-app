import { FormGroup, FormControl, FormLabel, Button, Col, FormCheck, FormSelect, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import QuizControlsFooter from "./QuizControlsFooter";
import PublishedIcon from "./PublishedIcon";
import Editor from 'react-simple-wysiwyg';
import { RxCross2 } from "react-icons/rx";
import { Tabs, Tab } from "react-bootstrap";
import { FaArrowRight, FaTrash } from "react-icons/fa";

export default function QuizzesEditor() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>({});
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState(quiz.timeLimit !== undefined && quiz.timeLimit !== null && quiz.timeLimit > 0);
    const [multipleAttemptsEnabled, setMultipleAttemptsEnabled] = useState(quiz.attempts > 1);
    const [previousTimeLimit, setPreviousTimeLimit] = useState(quiz.timeLimit || 30);
    const [activeTab, setActiveTab] = useState("details");

    useEffect(() => {
        const curQuiz = quizzes.find((q: any) => q._id === qid);
        if (curQuiz) {
            setQuiz(curQuiz);
            setAlreadyExists(true);
        }
    }, [qid, quizzes]);

    const setAnswers = (type: string) => {
        switch (type) {
            case "multiple_choice":
                return [];
            case "true_false":
                return ["True", "False"];
            default:
                return [""];
        }
    }

    return (
        <div>
            <div className="d-flex float-end align-items-center mt-3 mb-2">
                <h1 className="fs-4 me-4">{quiz.questions?.reduce((total: number, question: any) => total + question.points, 0) || 0} Points</h1>
                <div className="mb-3">
                    <PublishedIcon isPublished={quiz.published} />
                </div>
                <h1 className="fs-5 ms-1 text-secondary">{quiz.published ? "Published" : "Not Published"}</h1>
            </div>
            <br /><br /><hr />
            <Tabs id="quiz-editor-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
                <Tab eventKey="details" title="Details">
                    <FormGroup className="mb-4" controlId="wd-quiz-name">
                        <FormControl className="w-50" type="text" value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                    </FormGroup>
                    <FormGroup className="mb-4" controlId="wd-quiz-name">
                        <FormLabel>Quiz Instructions</FormLabel>
                        <Editor value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
                    </FormGroup>
                    <div className="container">
                        <div className="d-flex flex-column align-items-end">
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Quiz Type</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormSelect
                                        value={quiz.quizType}
                                        onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                                    >
                                        <option value="Graded Quiz">Graded Quiz</option>
                                        <option value="Practice Quiz">Practice Quiz</option>
                                        <option value="Graded Survey">Graded Survey</option>
                                        <option value="Ungraded Survey">Ungraded Survey</option>
                                    </FormSelect>
                                </Col>
                            </Row>
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Assignment Group</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormSelect
                                        value={quiz.assignmentGroup}
                                        onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                                        <option value="Quizzes">Quizzes</option>
                                        <option value="Exams">Exams</option>
                                        <option value="Assignments">Assignments</option>
                                        <option value="Project">Project</option>
                                    </FormSelect>
                                </Col>
                            </Row>
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Show Correct Answers</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormSelect
                                        value={quiz.showCorrectAnswers}
                                        onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}>
                                        <option value="Never">Never</option>
                                        <option value="Manually">Manually</option>
                                        <option value="Immediately">Immediately</option>
                                    </FormSelect>
                                </Col>
                            </Row>
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Access Code (leave blank for none)</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormControl type="text"
                                        value={quiz.accessCode}
                                        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Submission Type</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormGroup className="border p-3 rounded-2">
                                        <FormLabel className="fw-bold">Options</FormLabel>
                                        <FormCheck
                                            label="Shuffle Answers"
                                            checked={quiz.shuffleAnswers || true}
                                            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                                        <div className="d-flex align-items-center">
                                            <FormCheck
                                                className="me-2"
                                                label="Allow Multiple Attempts"
                                                checked={multipleAttemptsEnabled}
                                                onChange={(e) => {
                                                    if (multipleAttemptsEnabled) {
                                                        setQuiz({ ...quiz, attempts: 1 });
                                                    } else {
                                                        setQuiz({ ...quiz, attempts: quiz.attempts });
                                                    }
                                                    setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                                                    setMultipleAttemptsEnabled(!multipleAttemptsEnabled);
                                                }} />
                                            {multipleAttemptsEnabled && (
                                                <div className="w-50 d-flex align-items-center">
                                                    <FormControl className="w-25 me-2" type="text" value={quiz.attempts > 1 ? quiz.attempts : ""}
                                                        onChange={(e) => setQuiz({ ...quiz, attempts: parseInt(e.target.value) || 0 })} />
                                                    attempts
                                                </div>
                                            )}
                                        </div>
                                        <FormCheck
                                            label="Webcam Required"
                                            checked={quiz.webcamRequired || false}
                                            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
                                        <FormCheck
                                            label="One Question at a Time"
                                            checked={quiz.oneQuestionAtATime || true}
                                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                                        <FormCheck
                                            label="Lock Questions After Answering"
                                            checked={quiz.lockQuestionsAfterAsnwering || false}
                                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAsnwering: e.target.checked })} />
                                        <div className="d-flex align-items-center">
                                            <FormCheck
                                                className="me-2"
                                                label="Time Limit"
                                                checked={timeLimitEnabled}
                                                onChange={() => {
                                                    if (timeLimitEnabled) {
                                                        setPreviousTimeLimit(quiz.timeLimit);
                                                        setQuiz({ ...quiz, timeLimit: -1 });
                                                    } else {
                                                        setQuiz({ ...quiz, timeLimit: quiz.timeLimit > 0 ? quiz.timeLimit : previousTimeLimit });
                                                    }
                                                    setTimeLimitEnabled(!timeLimitEnabled);
                                                }} />
                                            {timeLimitEnabled && (
                                                <div className="w-50 d-flex align-items-center">
                                                    <FormControl className="w-25 me-2" type="text" value={quiz.timeLimit > 0 ? quiz.timeLimit : ""}
                                                        onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })} />
                                                    minutes
                                                </div>
                                            )}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-4 w-100">
                                <Col xs={4} className="text-end">
                                    <FormLabel className="me-2 mb-0 text-nowrap">Assign</FormLabel>
                                </Col>
                                <Col xs={8}>
                                    <FormGroup className="border p-3 rounded-2">
                                        <FormLabel className="fw-bold">Assign to</FormLabel>
                                        <div className="border p-1 rounded-2 mb-4">
                                            <Button variant="primary bg-secondary border-0 text-black">
                                                Everyone <RxCross2 className="ms-3" />
                                            </Button>
                                        </div>
                                        <FormLabel className="fw-bold">Due</FormLabel>
                                        <FormControl type="date" value={quiz.due} className="mb-4"
                                            onChange={(e) => setQuiz({ ...quiz, due: e.target.value })} />
                                        <Row>
                                            <Col xs={6}>
                                                <FormLabel className="fw-bold text-nowrap">Available from</FormLabel>
                                                <FormControl type="date" value={quiz.available}
                                                    onChange={(e) => setQuiz({ ...quiz, from: e.target.value })} />
                                            </Col>
                                            <Col xs={6}>
                                                <FormLabel className="fw-bold text-nowrap">Until</FormLabel>
                                                <FormControl type="date" value={quiz.until}
                                                    onChange={(e) => setQuiz({ ...quiz, to: e.target.value })} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="questions" title="Questions">
                    <div className="container">
                        {quiz.questions && quiz.questions.length > 0 ? (
                            quiz.questions.map((question: any, index: number) => (
                                <div key={index} className="border p-3 rounded-2 mb-3">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="fs-3 mb-3 flex-fill">Question {index + 1}</h3>
                                        <FormGroup className="mb-4 w-25 d-flex align-items-center" controlId={`question-${index}`}>
                                            <FormSelect
                                                className="me-2"
                                                value={question.type}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...quiz.questions];
                                                    updatedQuestions[index] = {
                                                        ...updatedQuestions[index],
                                                        type: e.target.value,
                                                        answers: setAnswers(e.target.value)
                                                    };
                                                    setQuiz({ ...quiz, questions: updatedQuestions });
                                                }}>
                                                <option value="multiple_choice">Multiple Choice</option>
                                                <option value="true_false">True/False</option>
                                                <option value="fill_in_blank">Fill in the Blank</option>
                                            </FormSelect>
                                            <FormControl className="w-50" type="text" value={question.points}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...quiz.questions];
                                                    updatedQuestions[index] = {
                                                        ...updatedQuestions[index],
                                                        points: e.target.value
                                                    };
                                                    setQuiz({ ...quiz, questions: updatedQuestions });
                                                }}>
                                            </FormControl>
                                            <FormLabel className="ms-2 mb-0">pts</FormLabel>
                                            <FaTrash
                                                className="text-danger fs-1 ms-3"
                                                onClick={() => {
                                                    const updatedQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
                                                    setQuiz({ ...quiz, questions: updatedQuestions });
                                                }}
                                            />
                                        </FormGroup>
                                    </div>
                                    <Editor
                                        value={question.question}
                                        onChange={(e) => {
                                            const updatedQuestions = [...quiz.questions];
                                            updatedQuestions[index] = {
                                                ...updatedQuestions[index],
                                                question: e.target.value
                                            };
                                            setQuiz({ ...quiz, questions: updatedQuestions });
                                        }} />
                                    <h3 className="fs-5 mt-3 mb-3 fw-bold">Answers</h3>
                                    {question.type === "true_false" && (
                                        <ul className="list-unstyled fs-5">
                                            {question.answers.map((answer: any, optIndex: number) => (
                                                <li
                                                    key={optIndex}
                                                    style={{ cursor: "pointer", color: answer === question.correct_answer ? "green" : "black" }}
                                                    onClick={() => {
                                                        const updatedQuestions = [...quiz.questions];
                                                        updatedQuestions[index] = {
                                                            ...updatedQuestions[index],
                                                            correct_answer: answer
                                                        };
                                                        setQuiz({ ...quiz, questions: updatedQuestions });
                                                    }}>
                                                    <FaArrowRight className="me-2" style={{ display: answer === question.correct_answer ? "inline" : "none" }} />
                                                    {answer}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {question.type === "multiple_choice" && (
                                        <div>
                                            <ul className="list-unstyled fs-5">
                                                {question.answers.map((answer: any, optIndex: number) => (
                                                    <li key={optIndex} className="mb-2">
                                                        <FormCheck
                                                            type="radio"
                                                            name={`correct-answer-${index}`}
                                                            checked={answer === question.correct_answer}
                                                            onChange={() => {
                                                                const updatedQuestions = [...quiz.questions];
                                                                updatedQuestions[index] = {
                                                                    ...updatedQuestions[index],
                                                                    correct_answer: answer
                                                                };
                                                                setQuiz({ ...quiz, questions: updatedQuestions });
                                                            }}
                                                            className="me-2 d-inline-block"
                                                        />
                                                        <FormControl
                                                            type="text"
                                                            value={answer}
                                                            onChange={(e) => {
                                                                const updatedQuestions = [...quiz.questions];
                                                                const updatedAnswers = [...updatedQuestions[index].answers];
                                                                updatedAnswers[optIndex] = e.target.value;
                                                                updatedQuestions[index] = {
                                                                    ...updatedQuestions[index],
                                                                    answers: updatedAnswers
                                                                };
                                                                setQuiz({ ...quiz, questions: updatedQuestions });
                                                            }}
                                                            className="w-75 d-inline-block me-2"
                                                        />
                                                        <FaTrash
                                                            className="text-danger"
                                                            onClick={() => {
                                                                const updatedQuestions = [...quiz.questions];
                                                                const updatedAnswers = updatedQuestions[index].answers.filter((_: any, i: number) => i !== optIndex);
                                                                updatedQuestions[index] = {
                                                                    ...updatedQuestions[index],
                                                                    answers: updatedAnswers
                                                                };
                                                                setQuiz({ ...quiz, questions: updatedQuestions });
                                                            }}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button variant="danger" size="sm" className="me-1"
                                                onClick={() => {
                                                    const updatedQuestions = [...quiz.questions];
                                                    const updatedAnswers = [...updatedQuestions[index].answers, ""];
                                                    updatedQuestions[index] = {
                                                        ...updatedQuestions[index],
                                                        answers: updatedAnswers
                                                    };
                                                    setQuiz({ ...quiz, questions: updatedQuestions });
                                                }}
                                            >
                                                Add Answer
                                            </Button>
                                        </div>
                                    )}
                                    {question.type === "fill_in_blank" && (
                                        <FormControl
                                            type="text"
                                            value={question.correct_answer}
                                            onChange={(e) => {
                                                const updatedQuestions = [...quiz.questions];
                                                updatedQuestions[index] = {
                                                    ...updatedQuestions[index],
                                                    correct_answer: e.target.value
                                                };
                                                setQuiz({ ...quiz, questions: updatedQuestions });
                                            }}
                                            className="w-75 d-inline-block me-2"
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No questions available.</p>
                        )}
                        <Button variant="secondary"
                            onClick={() => {
                                const newQuestion = {
                                    type: "multiple_choice",
                                    question: "",
                                    answers: [],
                                    correct_answer: "",
                                    points: 0,
                                };
                                setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQuestion] });
                            }}>
                            Add Question
                        </Button>
                    </div>
                </Tab>
            </Tabs>
            <hr />
            <QuizControlsFooter quiz={quiz} alreadyExists={alreadyExists} />
        </div>
    );
}