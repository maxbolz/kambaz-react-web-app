import { IoEllipsisVertical } from "react-icons/io5";
import PublishedIcon from "./PublishedIcon";
import { useState } from "react";
import FacultyProtected from "../../Account/FacultyProtected";
import * as quizzesClient from "./client";
import { deleteQuiz, updateQuiz } from "../Quizzes/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function QuizControlButtons({ quiz }: { quiz: any }) {

    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeQuiz = async () => {
        await quizzesClient.deleteQuiz(quiz._id);
        dispatch(deleteQuiz(quiz._id));
    };

    const publishUnpublishQuiz = async () => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await quizzesClient.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    };

    return (
        <FacultyProtected>
            <div className="float-end position-relative">
                <PublishedIcon isPublished={quiz.published} />
                <IoEllipsisVertical className="fs-4" onClick={() => setShowMenu(!showMenu)} style={{ cursor: "pointer" }} />
                {showMenu && (
                    <div className="position-absolute bg-white border rounded shadow-sm" style={{ right: 0, top: "100%", zIndex: 10 }}>
                        <ul className="list-unstyled m-0 p-2" onMouseLeave={() => setShowMenu(false)}>
                            <li className="p-2 hover-bg" style={{ cursor: "pointer", backgroundColor: "transparent" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/Editor`)} >
                                Edit
                            </li>
                            <li className="p-2 hover-bg" style={{ cursor: "pointer", backgroundColor: "transparent" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                onClick={() => removeQuiz()}>
                                Delete
                            </li>
                            <li className="p-2 hover-bg" style={{ cursor: "pointer", backgroundColor: "transparent" }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                onClick={() => publishUnpublishQuiz()}>
                                {quiz.published ? "Unpublish" : "Publish"}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </FacultyProtected>);
}