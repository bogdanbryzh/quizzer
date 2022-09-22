import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Quizzer
        </Link>
      </div>

      <nav className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
          <li>
            <Link to="/answers">Answers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
