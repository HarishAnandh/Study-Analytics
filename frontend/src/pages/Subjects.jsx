import axios from "axios";
import { useEffect, useState } from "react";
import { FaBook, FaChartLine, FaBrain } from "react-icons/fa";

function Subjects() {
const [name, setName] = useState("");
const [difficulty, setDifficulty] = useState("");
const [proficiency, setProficiency] = useState("");
const [subjects, setSubjects] = useState([]);

useEffect(() => {
fetchSubjects();
}, []);

const fetchSubjects = async () => {
const response = await axios.get(
"https://study-analytics.onrender.com/subjects"
);


setSubjects(response.data);


};

const handleSubmit = async () => {
if (!name) return;


const priority =
  Number(difficulty) *
  (100 - Number(proficiency));

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
subjects.reduce(
(sum, s) => sum + Number(s.difficulty),
0
) / subjects.length
).toFixed(1)
: 0;

return (
<div
style={{
minHeight: "100vh",
background: "#0f172a",
color: "white",
padding: "30px",
fontFamily: "Arial",
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "30px",
}}
>
📚 Study Analytics Dashboard </h1>
<h2 style={{
textAlign: "center",
marginBottom: "30px",
}}>By Harish Anandh</h2>

  <div
    style={{
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "30px",
    }}
  >
    <div className="card">
      <FaBook size={25} />
      <h3>{subjects.length}</h3>
      <p>Total Subjects</p>
    </div>

    <div className="card">
      <FaChartLine size={25} />
      <h3>{avgDifficulty}</h3>
      <p>Avg Difficulty</p>
    </div>

    <div className="card">
      <FaBrain size={25} />
      <h3>
        {subjects.length > 0
          ? Math.max(
              ...subjects.map((s) =>
                Number(s.priority)
              )
            )
          : 0}
      </h3>
      <p>Highest Priority</p>
    </div>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "30px",
    }}
  >
    <h2>Add Subject</h2>

    <input
      placeholder="Subject Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="inputBox"
    />

    <input
      placeholder="Difficulty (1-10)"
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="inputBox"
    />

    <input
      placeholder="Knowledge (%)"
      value={proficiency}
      onChange={(e) => setProficiency(e.target.value)}
      className="inputBox"
    />

    <button
      onClick={handleSubmit}
      className="saveBtn"
    >
      Save Subject
    </button>
  </div>

  <h2>Subjects</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    }}
  >
    {subjects.map((subject, index) => (
      <div
        key={index}
        style={{
          background: "#1e293b",
          borderRadius: "15px",
          padding: "20px",
          transition: "0.3s",
        }}
      >
        <h3>{subject.name}</h3>

        <p>
          Difficulty: {subject.difficulty}
        </p>

        <p>
          Knowledge: {subject.proficiency}%
        </p>

        <p>
          Priority: {subject.priority}
        </p>

        <div
          style={{
            background: "#334155",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${subject.proficiency}%`,
              height: "10px",
              background: "#38bdf8",
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>

);
}

export default Subjects;
