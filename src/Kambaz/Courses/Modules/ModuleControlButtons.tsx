import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import FacultyProtected from "../../Account/FacultyProtected";

import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {
    return (
        <div className="float-end">
            <FacultyProtected>
                <FaPencil className="text-primary me-3" onClick={() => editModule(moduleId)} />
                <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
            </FacultyProtected>
            <GreenCheckmark />
            <BsPlus className="fs-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}