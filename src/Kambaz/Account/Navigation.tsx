import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (links.map((link) =>
    <div id="wd-courses-navigation" className="wd list-group fs-5 me-5 rounded-0">
      <Link to={`/Kambaz/Account/${link}`} className="list-group-item active border border-0"> {link} </Link> <br />
    </div>
  ));
}