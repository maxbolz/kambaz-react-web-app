import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    responses: []
};
const responsesSlice = createSlice({
    name: "responses",
    initialState,
    reducers: {
        setResponses: (state, { payload: responses }) => {
            state.responses = responses;
        },
        addResponse: (state, { payload: response }) => {
            const newResponse: any = {
                _id: uuidv4(),
                quiz: response.quiz,
                user: response.user,
                answers: response.answers
            };
            state.responses = [...state.responses, newResponse] as any;
        },
        deleteResponse: (state, { payload: responseId }) => {
            state.responses = state.responses.filter(
                (m: any) => m._id !== responseId);
        },
        updateResponse: (state, { payload: response }) => {
            state.responses = state.responses.map((m: any) =>
                m._id === response._id ? response : m
            ) as any;
        },
        editResponse: (state, { payload: responseId }) => {
            state.responses = state.responses.map((m: any) =>
                m._id === responseId ? { ...m, editing: true } : m
            ) as any;
        }
    }
});
export const { addResponse, deleteResponse, updateResponse, editResponse, setResponses } =
    responsesSlice.actions;
export default responsesSlice.reducer;