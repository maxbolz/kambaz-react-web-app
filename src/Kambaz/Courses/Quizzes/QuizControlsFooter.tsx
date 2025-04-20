import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { addQuiz, updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import * as coursesClient from "../client"
import * as quizzesClient from "./client";

export default function QuizControlsFooter({ quiz, alreadyExists }: any) {

    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const returnBack = async () => {
        let redirectQuiz;
        if (alreadyExists) {
            redirectQuiz = await saveQuiz(quiz, quiz.published);
        }
        else {
            redirectQuiz = await createQuizForCourse();
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${redirectQuiz._id}`);
    };

    const saveAndPublish = async () => {
        if (alreadyExists) {
            await saveQuiz(quiz, !quiz.published);
        }
        else {
            await createQuizForCourse(true);
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes/`);
    };

    const createQuizForCourse = async (publish?: boolean) => {
        if (!cid) return;
        const newQuiz = {
            title: quiz.title ?? "My Quiz",
            description: quiz.description ?? "This is my quiz!",
            course: cid,
            quizType: quiz.quizType ?? "Graded Quiz",
            assignmentGroup: quiz.assignmentGroup ?? "Quizzes",
            shuffleAnswers: quiz.shuffleAnswers ?? true,
            timeLimit: quiz.timeLimit ?? -1,
            multipleAttempts: quiz.multipleAttempts ?? false,
            showCorrectAnswers: quiz.showCorrectAnswers ?? "Manually",
            accessCode: quiz.accessCode ?? "",
            oneAtATime: quiz.oneAtATime ?? true,
            webcamRequired: quiz.webcamRequired ?? false,
            lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
            due: quiz.due,
            available: quiz.available,
            until: quiz.until,
            questions: quiz.questions ?? [],
            published: publish ?? quiz.published ?? false,
            attempts: quiz.attempts ?? 1
        };
        const createdQuiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        dispatch(addQuiz(createdQuiz));
        return createdQuiz;
    };

    const saveQuiz = async (quiz: any, publish: boolean) => {
        await quizzesClient.updateQuiz({...quiz, published: publish});
        dispatch(updateQuiz(quiz));
        return quiz;
    };

    return (
        <div id="wd-quizzes-controls" className="text-nowrap">
            <Button onClick={saveAndPublish} variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Save and {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button onClick={returnBack} variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Save
            </Button>
            <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)} variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Cancel
            </Button>
        </div>
    );
}