import { Link } from "react-router-dom";
import { Form, FormSelect, Button } from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <Form.Control id="wd-username"
                placeholder="username"
                defaultValue="alice"
                className="mb-2" />
            <Form.Control id="wd-password"
                placeholder="password"
                defaultValue="123"
                className="mb-2" />
            <Form.Control id="wd-firstname"
                placeholder="First Name"
                defaultValue="Alice"
                className="mb-2" />
            <Form.Control id="wd-lastname"
                placeholder="Last Name"
                defaultValue="Wonderland"
                className="mb-2" />
            <Form.Control id="wd-dob"
                type="date"
                defaultValue="mm/dd/yyyy"
                className="mb-2" />
            <Form.Control id="wd-email"
                type="email"
                placeholder="email"
                defaultValue="alice@wonderland"
                className="mb-2" />
            <FormSelect id="wd-role" className="mb-2">
                <option value="USER">User</option>       <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
            </FormSelect>
            <Link id="wd-signin-btn"
                to="/Kambaz/Account/Signin"
                className="btn bg-danger border-0 btn-primary w-100 mb-2">
                Sign out 
            </Link>
        </div>
    );
}