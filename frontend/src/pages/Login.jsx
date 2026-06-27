import { useState } from "react";
import supabase from "../supabase";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");

const handleLogin = async () => {
const { error } =
await supabase.auth.signInWithPassword({
email,
password,
});


if (error) {
  alert(error.message);
} else {
  window.location.href = "/dashboard";
}


};

const handleSignup = async () => {
const { error } =
await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      username: username,
    },
  },
});


if (error) {
  alert(error.message);
} else {
  alert(
    "Account created successfully. Please verify your email."
  );
}


};

return (
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(135deg,#0f172a,#1e293b)",
display: "flex",
justifyContent: "center",
alignItems: "center",
fontFamily: "Arial",
}}
>
<div
style={{
background: "#1e293b",
padding: "40px",
borderRadius: "20px",
width: "400px",
boxShadow:
"0px 10px 30px rgba(0,0,0,0.4)",
textAlign: "center",
}}
>
<h1
style={{
color: "cyan",
marginBottom: "10px",
}}
>
Snippa </h1>


    <p
      style={{
        color: "#94a3b8",
        marginBottom: "30px",
      }}
    >
      Made for student. Made by student.
    </p>

    <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) =>
    setUsername(e.target.value)
  }
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#334155",
    color: "white",
    boxSizing: "border-box",
  }}
/>

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        borderRadius: "10px",
        border: "none",
        background: "#334155",
        color: "white",
        boxSizing: "border-box",
      }}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "20px",
        borderRadius: "10px",
        border: "none",
        background: "#334155",
        color: "white",
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={handleLogin}
      style={{
        width: "100%",
        padding: "14px",
        background: "#38bdf8",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "12px",
      }}
    >
      Login
    </button>

    <button
      onClick={handleSignup}
      style={{
        width: "100%",
        padding: "14px",
        background: "#22c55e",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      Create Account
    </button>

    <p
      style={{
        color: "cyan",
        marginTop: "20px",
        fontSize: "14px",
      }}
    >
      A Hector Product
    </p>
  </div>
</div>


);
}

export default Login;
