import { Table } from "react-bootstrap";
import { FaUserCircle, FaPaw } from "react-icons/fa";
export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name text-danger">Tony</span>{" "}
                        <span className="wd-last-name text-danger">Stark</span></td>
                        <td className="wd-login-id">001234561S</td>
                        <td className="wd-section">S101</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2020-10-01</td>
                        <td className="wd-total-activity">10:21:32</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name text-danger">Kendrick</span>{" "}
                        <span className="wd-last-name text-danger">Lamar</span></td>
                        <td className="wd-login-id">002939450S</td>
                        <td className="wd-section">S80</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2025-02-02</td>
                        <td className="wd-total-activity">34:25:13</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name text-danger">George</span>{" "}
                        <span className="wd-last-name text-danger">Washington</span></td>
                        <td className="wd-login-id">000000001S</td>
                        <td className="wd-section">S1</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">1799-12-14</td>
                        <td className="wd-total-activity">153:30:05</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name text-danger">Ash</span>{" "}
                        <span className="wd-last-name text-danger">Ketchum</span></td>
                        <td className="wd-login-id">003957301S</td>
                        <td className="wd-section">S151</td>
                        <td className="wd-role">STUDENT</td>
                        <td className="wd-last-activity">2023-11-11</td>
                        <td className="wd-total-activity">5:31:26</td></tr>
                    <tr><td className="wd-full-name text-nowrap">
                        <FaPaw className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name text-danger">Paws</span>{" "}
                        <span className="wd-last-name text-danger">Husky</span></td>
                        <td className="wd-login-id">009909999S</td>
                        <td className="wd-section">S100</td>
                        <td className="wd-role">DOG</td>
                        <td className="wd-last-activity">2025-2-4</td>
                        <td className="wd-total-activity">6:49:45</td></tr>
                </tbody>
            </Table>
        </div>);
}