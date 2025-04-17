import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as accountClient from "../Account/client";
import { useEffect, useState } from "react";
export default function Courses() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const { courses } = useSelector((state: any) => state.courseReducer);
    const course = courses.find((course: any) => course._id === cid);
    const { pathname } = useLocation();
    const fetchUsers = async () => {
        const users = await accountClient.findUsersForCourse(cid as string);
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    });
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]}</h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                        <Route path="People" element={<PeopleTable users={users}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}