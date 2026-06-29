import { useEffect, useState } from "react";
import supabase from "../supabase";
import Navbar from "../components/Navbar";
import "../theme.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const initials = (user?.user_metadata?.username || "U").slice(0, 2).toUpperCase();

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container" style={{ maxWidth: "640px" }}>
          <p className="eyebrow">Account</p>
          <h1 style={{ fontSize: "34px", marginTop: "6px", marginBottom: "24px" }}>
            👤 Your profile
          </h1>

          <div className="card card-pad">
            <div className="flex-row gap-16" style={{ marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: "var(--violet)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  border: "2px solid var(--ink)",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div>
                <h2 style={{ fontSize: "22px" }}>
                  {user?.user_metadata?.username || "User"}
                </h2>
                <p className="muted" style={{ margin: "4px 0 0", fontSize: "14px" }}>
                  {user?.email}
                </p>
              </div>
            </div>

            <div style={{ borderTop: "2px solid var(--line)", paddingTop: "18px" }}>
              <div style={{ marginBottom: "14px" }}>
                <p className="field-label">Username</p>
                <p style={{ margin: 0, fontSize: "15px" }}>
                  {user?.user_metadata?.username || "User"}
                </p>
              </div>

              <div>
                <p className="field-label">User ID</p>
                <p className="mono" style={{ margin: 0, fontSize: "13px", color: "var(--ink-soft)", wordBreak: "break-all" }}>
                  {user?.id}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ marginTop: "24px" }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;