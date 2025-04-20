import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const RESPONSES_API = `${REMOTE_SERVER}/api/responses`;
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};
export const findQuizById = async (quizId: any) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const deleteResponse = async (responseId: string) => {
    const response = await axiosWithCredentials.delete(`${RESPONSES_API}/${responseId}`);
    return response.data;
};
export const updateResponse = async (response: any) => {
    const { data } = await axiosWithCredentials.put(`${RESPONSES_API}/${response._id}`, response);
    return data;
};
export const findResponseById = async (response: any) => {
    const r = await axiosWithCredentials.get(`${RESPONSES_API}/${response._id}`);
    return r.data;
};
export const findResponse = async (userId: any, quizId: any) => {
    const r = await axiosWithCredentials.get(`${RESPONSES_API}/user/${userId}/quiz/${quizId}`);
    return r.data;
}