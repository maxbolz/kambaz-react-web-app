import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import courseReducer from "./Courses/reducer";
import enrollmentReducer from "./reducer";
import quizReducer from "./Courses/Quizzes/reducer";
import responseReducer from "./Courses/Quizzes/responsesReducer";

const store = configureStore({
    reducer: {
        modulesReducer, accountReducer, assignmentReducer, courseReducer, enrollmentReducer, quizReducer, responseReducer
    },
});
export default store;