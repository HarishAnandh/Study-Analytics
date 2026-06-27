import { Link } from "react-router-dom";
import supabase from "../supabase";


function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace("/");
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom:
          "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          margin: 0,
        }}
      >
        🦕 Snippa
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          👤 Profile
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background: "#38bdf8",
            color: "black",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
           Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;