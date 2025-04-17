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
        if (alreadyExists) {
            await saveQuiz(quiz);
        }
        else {
            await createQuizForCourse();
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    const saveAndPublish = async () => {
        if (alreadyExists) {
            await saveQuiz(quiz);
        }
        else {
            await createQuizForCourse();
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes/`);
        // publishUnpublishQuiz(quiz);
    };

    // const publishUnpublishQuiz = async (quiz: any) => {
    //     const updatedQuiz = { ...quiz, published: !quiz.published };
    //     await quizzesClient.updateQuiz(updatedQuiz);
    //     dispatch(updateQuiz(updatedQuiz));
    //     setQuiz(updatedQuiz);
    // };

    const createQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = {
            title: quiz.title,
            course: cid,
            description: quiz.description,
        };
        const createdQuiz = await coursesClient.createQuizForCourse(cid, newQuiz);
        dispatch(addQuiz(createdQuiz));
    };

    const saveQuiz = async (quiz: any) => {
        await quizzesClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    return (
        <div id="wd-quizzes-controls" className="text-nowrap">
            <Button onClick={saveAndPublish} variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                Save and Publish
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