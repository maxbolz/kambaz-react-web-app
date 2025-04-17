import { FaBan, FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark({ isPublished }: { isPublished: boolean }) {
    return (
        <span className="me-1 position-relative">
            {isPublished ?
                <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" /> :
                <FaBan style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />}
            <FaCircle className="text-white me-1 fs-6" />
        </span>);
}