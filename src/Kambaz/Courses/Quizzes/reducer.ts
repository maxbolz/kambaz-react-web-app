import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, { payload: quizzes }) => {
            state.quizzes = quizzes;
        },
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: uuidv4(),
                title: quiz.title,
                description: quiz.description,
                course: quiz.course,
                quizType: quiz.quizType,
                points: quiz.points,
                assignmentGroup: quiz.assignmentGroup,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                multipleAttempts: quiz.multipleAttempts,
                showCorrectAnswers: quiz.showCorrectAnswers,
                accessCode: quiz.accessCode,
                oneAtATime: quiz.oneAtATime,
                webcamRequired: quiz.webcamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
                due: quiz.due,
                available: quiz.available,
                until: quiz.until,
                questions: quiz.questions
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (m: any) => m._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quiz._id ? quiz : m
            ) as any;
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quizId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
    quizzesSlice.actions;
export default quizzesSlice.reducer;