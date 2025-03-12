import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: uuidv4(),
                user: enrollment.user,
                course: enrollment.course
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (c: any) => c._id !== enrollmentId
            );
        }
    },
});
export const { addEnrollment, deleteEnrollment } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;