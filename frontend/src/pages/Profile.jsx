import { useEffect, useState } from "react";
import supabase from "../supabase";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(
      ({ data }) => {
        setUser(data.user);
      }
    );
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/";
  };



  return (
  <>
    <Navbar />

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>👤 User Profile</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <h2>Account Details</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user?.user_metadata?.username ||
 "User"}
        </p>

        <p>
          <strong>User ID:</strong>{" "}
          {user?.id}
        </p>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Logout
        </button>
      </div>
      </div>
  </>
);
}

export default Profile;