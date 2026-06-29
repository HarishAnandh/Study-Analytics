import { useState } from "react";
import supabase from "../supabase";
import "../theme.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Account created successfully. Please verify your email.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(32,32,29,0.06) 1px, transparent 0)",
        backgroundSize: "22px 22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ width: "420px" }}>
        {/* Brand mark */}
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "8px 16px",
              borderRadius: "100px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            ✏️ study smarter, not harder
          </div>
        </div>

        <div className="card card-pad" style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            Snippa
          </h1>

          <p className="muted" style={{ marginTop: "8px", marginBottom: "28px", fontSize: "15px" }}>
            Made for students. Made by a student.
          </p>

          <div style={{ textAlign: "left", marginBottom: "14px" }}>
            <label className="field-label">Username</label>
            <input
              type="text"
              placeholder="e.g. harish_a"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "14px" }}>
            <label className="field-label">Email address</label>
            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "22px" }}>
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-coral btn-block"
            style={{ marginBottom: "12px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Working..." : "Log in"}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn btn-mint btn-block"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Working..." : "Create account"}
          </button>

          <p className="muted mono" style={{ marginTop: "22px", fontSize: "12px" }}>
            A HECTOR product
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;