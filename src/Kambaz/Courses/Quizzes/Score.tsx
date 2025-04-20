import { useState, useEffect } from "react";
import * as quizzesClient from "./client";

export default function Score({ user, quiz }: { user: any, quiz: any }) {

    const [score, setScore] = useState("");

    const getScore = async () => {
        const foundResponses = await quizzesClient.findResponse(user._id, quiz._id);
        if (foundResponses.length === 0) return;
        const foundResponse = foundResponses.sort((a: any, b: any) => a.attempt - b.attempt)[foundResponses.length - 1];
        const foundQuizzes = await quizzesClient.findQuizById(quiz._id);
        const foundQuiz = foundQuizzes[0];
        const totalPoints = foundQuiz.questions.reduce((total: number, question: any) => total + question.points, 0)
        let curPoints = 0;
        for (const question of (foundQuiz.questions || [])) {
            for (const answer of foundResponse.answers) {
                if (question.id === answer.questionId && question.correct_answer === answer.answer) {
                    curPoints += question.points;
                }
            }
        }
        setScore(`${curPoints}/${totalPoints}`);
    };
    useEffect(() => {
        getScore();
    }, [quiz]);

    return (
        <div className="wd-score float-end me-3">
            <span className="fs-4 fw-bold">{score}</span>
        </div>
    );
}