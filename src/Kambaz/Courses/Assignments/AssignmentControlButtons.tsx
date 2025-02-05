import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <span className="border border-black border-secondary rounded-pill px-2 py-2 mx-2">40% of Total</span>
            <BsPlus className="fs-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}