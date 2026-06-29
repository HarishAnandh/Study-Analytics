import "../theme.css";

// Note: this component currently isn't routed in App.jsx —
// the "/dashboard" path renders Subjects.jsx, which already
// contains the full dashboard (stats, chart, subject list).
// Keeping this as a lightweight standalone view in case you
// want to split it out later.
function Dashboard() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Overview</p>
        <h1 style={{ fontSize: "32px", marginTop: "6px" }}>
          📚 Study Analytics Dashboard
        </h1>
        <p className="muted" style={{ marginTop: "8px" }}>
          This view is a placeholder — your live dashboard lives in Subjects.jsx.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;