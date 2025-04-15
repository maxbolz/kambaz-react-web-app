import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AccountNavigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (links.map((link) =>
    <div id="wd-courses-navigation" className="wd list-group fs-5 me-5 rounded-0">
      <Link to={`/Kambaz/Account/${link}`} className={`list-group-item ${active(link)} border border-0`}> {link} </Link> <br />
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")} border border-0`}> Users </Link>)}
    </div>
  ));
}