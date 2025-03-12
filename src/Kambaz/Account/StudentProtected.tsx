import { useSelector } from "react-redux";
export default function FacultyProtected({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser?.role === "STUDENT") {
        return children;
    } else {
        return <></>;
    }
}