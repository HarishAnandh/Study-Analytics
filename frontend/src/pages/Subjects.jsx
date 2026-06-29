import supabase from "../supabase";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBook, FaChartLine, FaBrain } from "react-icons/fa";
import SubjectChart from "../components/SubjectChart";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import "../theme.css";

function getTier(priority, maxPriority) {
  if (maxPriority <= 0) return { color: "var(--mint)", soft: "var(--mint-soft)", label: "Low" };
  const ratio = priority / maxPriority;
  if (ratio > 0.75) return { color: "var(--coral)", soft: "var(--coral-soft)", label: "Critical" };
  if (ratio > 0.5) return { color: "var(--sun)", soft: "var(--sun-soft)", label: "High" };
  if (ratio > 0.25) return { color: "var(--violet)", soft: "var(--violet-soft)", label: "Medium" };
  return { color: "var(--mint)", soft: "var(--mint-soft)", label: "Low" };
}

function Subjects() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchSubjects();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://study-analytics.onrender.com/subjects"
      );

      const sortedSubjects = response.data.sort(
        (a, b) => b.priority - a.priority
      );

      setSubjects(sortedSubjects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://study-analytics.onrender.com/subjects/${id}`
      );

      console.log("DELETE SUCCESS:", response.data);

      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  const handleSubmit = async () => {
    if (!name) return;

    const calculatedPriority = Number(difficulty) * (100 - Number(proficiency));

    const priority = Math.max(calculatedPriority, 10);

    const newSubject = {
      name,
      difficulty,
      proficiency,
      priority,
    };

    try {
      await axios.post(
        "https://study-analytics.onrender.com/subjects",
        newSubject
      );

      setSubjects([...subjects, newSubject]);

      setName("");
      setDifficulty("");
      setProficiency("");
    } catch (error) {
      console.error(error);
    }
  };

  const avgDifficulty =
    subjects.length > 0
      ? (
          subjects.reduce((sum, s) => sum + Number(s.difficulty), 0) /
          subjects.length
        ).toFixed(1)
      : 0;

  console.log(subjects);

  const topSubject =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.priority > current.priority ? prev : current
        )
      : null;

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highestPriority =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.priority > current.priority ? prev : current
        )
      : null;

  const mostDifficult =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.difficulty > current.difficulty ? prev : current
        )
      : null;

  const strongestSubject =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.proficiency > current.proficiency ? prev : current
        )
      : null;

  const avgKnowledge =
    subjects.length > 0
      ? (
          subjects.reduce((sum, s) => sum + Number(s.proficiency), 0) /
          subjects.length
        ).toFixed(1)
      : 0;

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Study Analytics Timetable", 20, 20);

    const [startHour, startMinute] = startTime.split(":").map(Number);

    const [endHour, endMinute] = endTime.split(":").map(Number);

    const totalMinutes =
      endHour * 60 + endMinute - (startHour * 60 + startMinute);

    const sortedSubjects = [...subjects].sort(
      (a, b) => b.priority - a.priority
    );

    const totalPriority = sortedSubjects.reduce(
      (sum, s) => sum + Number(s.priority),
      0
    );

    let currentTime = startHour * 60 + startMinute;

    let y = 40;

    sortedSubjects.forEach((subject) => {
      const allocatedMinutes = Math.max(
        30,
        Math.floor((subject.priority / totalPriority) * totalMinutes)
      );

      const startH = Math.floor(currentTime / 60);

      const startM = currentTime % 60;

      const endTimeMinutes = currentTime + allocatedMinutes;

      const endH = Math.floor(endTimeMinutes / 60);

      const endM = endTimeMinutes % 60;

      const startLabel = `${String(startH).padStart(2, "0")}:${String(
        startM
      ).padStart(2, "0")}`;

      const endLabel = `${String(endH).padStart(2, "0")}:${String(
        endM
      ).padStart(2, "0")}`;

      doc.text(`${startLabel} - ${endLabel}`, 20, y);

      doc.text(subject.name, 70, y);

      y += 12;

      currentTime = endTimeMinutes;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("StudyTimetable.pdf");
  };

  const [startTime, setStartTime] = useState("09:00");

  const [endTime, setEndTime] = useState("18:00");
  const totalSubjects = subjects.length;

  const highestPrioritySubject =
    subjects.length > 0
      ? subjects.reduce((prev, curr) =>
          prev.priority > curr.priority ? prev : curr
        )
      : null;

  const maxPriorityValue =
    subjects.length > 0 ? Math.max(...subjects.map((s) => Number(s.priority))) : 0;

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container">
          {/* Greeting header */}
          <p className="eyebrow">{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", marginTop: "6px" }}>
            Hey {user?.user_metadata?.username || "there"} 👋
          </h1>
          <p className="muted" style={{ marginTop: "8px", marginBottom: "28px" }}>
            Here's where your study time is most needed today.
          </p>

          {/* Account summary strip */}
          <div
            className="card card-pad"
            style={{
              marginBottom: "24px",
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <div>
              <p className="field-label">Signed in as</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{user?.email}</p>
            </div>
            <div style={{ width: "2px", height: "32px", background: "var(--line)" }} />
            <div>
              <p className="field-label">Subjects tracked</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{totalSubjects}</p>
            </div>
            <div style={{ width: "2px", height: "32px", background: "var(--line)" }} />
            <div>
              <p className="field-label">Avg. knowledge</p>
              <p style={{ margin: 0, fontWeight: 600 }}>{avgKnowledge}%</p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="flex-row gap-16" style={{ flexWrap: "wrap", marginBottom: "28px" }}>
            <div className="stat-tile" style={{ "--accent": "var(--violet)" }}>
              <FaBook className="stat-icon" size={22} />
              <div className="stat-value">{subjects.length}</div>
              <div className="stat-label">Total subjects</div>
            </div>

            <div className="stat-tile" style={{ "--accent": "var(--sun)" }}>
              <FaChartLine className="stat-icon" size={22} />
              <div className="stat-value">{avgDifficulty}</div>
              <div className="stat-label">Avg difficulty</div>
            </div>

            <div className="stat-tile" style={{ "--accent": "var(--coral)" }}>
              <FaBrain className="stat-icon" size={22} />
              <div className="stat-value">{maxPriorityValue}</div>
              <div className="stat-label">Highest priority</div>
            </div>
          </div>

          {/* Add subject form */}
          <div className="card card-pad" style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "19px", marginBottom: "16px" }}>➕ Add a subject</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label className="field-label">Subject name</label>
                <input
                  placeholder="e.g. Physics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="field-label">Difficulty (1–10)</label>
                <input
                  placeholder="8"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="field-label">Knowledge (%)</label>
                <input
                  placeholder="40"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-violet">
              Save subject
            </button>
          </div>

          {/* Timetable generator */}
          <div className="card card-pad" style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "19px", marginBottom: "16px" }}>📅 Generate study timetable</h2>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <div>
                <label className="field-label">Start time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="field-label">End time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <button onClick={exportPDF} className="btn btn-mint">
              Generate &amp; download PDF
            </button>
          </div>

          {/* Today's focus spotlight (signature element) */}
          {topSubject && (
            <div className="spotlight" style={{ marginBottom: "28px" }}>
              <p className="eyebrow" style={{ color: "var(--sun)" }}>Today's focus</p>
              <h2 style={{ fontSize: "26px", marginTop: "8px", color: "var(--paper)" }}>
                <span className="marker">{topSubject.name}</span>
              </h2>
              <p style={{ marginTop: "10px", color: "rgba(255,246,233,0.75)", fontSize: "14px" }}>
                Priority score of {topSubject.priority} — the largest gap between difficulty and what you know right now.
              </p>
            </div>
          )}

          {/* Chart */}
          <SubjectChart subjects={subjects} />

          {/* Search + subject grid */}
          <div className="flex-row" style={{ justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ fontSize: "19px" }}>Your subjects</h2>
            <input
              type="text"
              placeholder="🔍 Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
              style={{ maxWidth: "260px" }}
            />
          </div>

          {filteredSubjects.length === 0 ? (
            <div className="card card-pad" style={{ textAlign: "center", color: "var(--ink-soft)" }}>
              {subjects.length === 0
                ? "No subjects yet — add one above to get started."
                : "No subjects match your search."}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "18px",
                marginBottom: "32px",
              }}
            >
              {filteredSubjects.map((subject) => {
                const tier = getTier(Number(subject.priority), maxPriorityValue);
                return (
                  <div
                    key={subject.id}
                    className="subject-card"
                    style={{ "--tier-color": tier.color, "--tier-soft": tier.soft }}
                  >
                    <div className="flex-row" style={{ justifyContent: "space-between", marginBottom: "10px" }}>
                      <h3 style={{ fontSize: "17px" }}>{subject.name}</h3>
                      <span className="tier-tag">{tier.label}</span>
                    </div>

                    <p className="muted" style={{ margin: "4px 0", fontSize: "14px" }}>
                      Difficulty: <strong style={{ color: "var(--ink)" }}>{subject.difficulty}</strong>
                    </p>
                    <p className="muted" style={{ margin: "4px 0", fontSize: "14px" }}>
                      Knowledge: <strong style={{ color: "var(--ink)" }}>{subject.proficiency}%</strong>
                    </p>
                    <p className="muted" style={{ margin: "4px 0", fontSize: "14px" }}>
                      Priority: <strong style={{ color: "var(--ink)" }}>{subject.priority}</strong>
                    </p>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${subject.proficiency}%` }}
                      />
                    </div>

                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="btn btn-danger btn-sm"
                      style={{ marginTop: "14px" }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Study insights */}
          <div className="card card-pad" style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "19px", marginBottom: "16px" }}>📈 Study insights</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
              }}
            >
              <div>
                <p className="field-label">🔥 Highest priority</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{highestPriority?.name || "—"}</p>
              </div>
              <div>
                <p className="field-label">⚡ Most difficult</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{mostDifficult?.name || "—"}</p>
              </div>
              <div>
                <p className="field-label">🧠 Strongest subject</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{strongestSubject?.name || "—"}</p>
              </div>
              <div>
                <p className="field-label">📚 Average knowledge</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{avgKnowledge}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subjects;