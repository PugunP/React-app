import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../service/authorize";

const NavbarComponent = ({ history }) => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/" className="nav-link">
            หน้าเเรก
          </Link>
        </li>
        {getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/create" className="nav-link">
              บทความ
            </Link>
          </li>
        )}
        {!getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/login" className="nav-link">
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
        {getUser() && (
          <li className="nav-item pr-3 pt-3 pb-3">
            <button
              to="/create"
              className="nav-link"
              onClick={() => logout(() => history.push("/"))}
            >
              ออกจากระบบ
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(NavbarComponent);
