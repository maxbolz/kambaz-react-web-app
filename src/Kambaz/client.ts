import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const unenrollUser = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${ENROLLMENTS_API}/unenroll/${userId}/${courseId}`);
    return response.data;
};
export const enrollUser = async (userId: string, courseId: string) => {
    const { data } = await axios.post(`${ENROLLMENTS_API}/enroll/${userId}/${courseId}`);
    return data;
};
export const findAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API);
    return data;
};