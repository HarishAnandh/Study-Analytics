import { Link, useLocation } from "react-router-dom";
import supabase from "../supabase";
import "../theme.css";

function Navbar() {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      <div className="flex-row gap-8">
        <span style={{ fontSize: "24px" }}>📚</span>
        <h2 style={{ color: "var(--ink)", fontSize: "20px" }}>Snippa</h2>
      </div>

      <div className="nav-links">
        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/profile"
          className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
        >
          👤 Profile
        </Link>

        <button onClick={handleLogout} className="btn btn-coral btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;