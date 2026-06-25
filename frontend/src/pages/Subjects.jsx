import supabase from "../supabase";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBook, FaChartLine, FaBrain } from "react-icons/fa";
import SubjectChart from "../components/SubjectChart";
import { color } from "chart.js/helpers";
import jsPDF from "jspdf";

function Subjects() {
const [name, setName] = useState("");
const [difficulty, setDifficulty] = useState("");
const [proficiency, setProficiency] = useState("");
const [subjects, setSubjects] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
fetchSubjects();
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
  
    setSubjects(
      subjects.filter(
        (subject) => subject.id !== id
      )
    );
  
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};
  
  

const handleSubmit = async () => {
if (!name) return;


const calculatedPriority =
  Number(difficulty) *
  (100 - Number(proficiency));

const priority = Math.max(
  calculatedPriority,
  10
);

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

console.log(subjects);

const topSubject =
  subjects.length > 0
    ? subjects.reduce((prev, current) =>
        prev.priority > current.priority
          ? prev
          : current
      )
    : null;

const filteredSubjects = subjects.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const highestPriority =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.priority > current.priority
            ? prev
            : current
        )
      : null;
  
  const mostDifficult =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.difficulty > current.difficulty
            ? prev
            : current
        )
      : null;
  
  const strongestSubject =
    subjects.length > 0
      ? subjects.reduce((prev, current) =>
          prev.proficiency > current.proficiency
            ? prev
            : current
        )
      : null;
  
  const avgKnowledge =
    subjects.length > 0
      ? (
          subjects.reduce(
            (sum, s) =>
              sum + Number(s.proficiency),
            0
          ) / subjects.length
        ).toFixed(1)
      : 0;

      const exportPDF = () => {
        const doc = new jsPDF();
      
        doc.setFontSize(22);
        doc.text(
          "Study Analytics - Smart Timetable",
          20,
          20
        );
      
        doc.setFontSize(12);
      
        const sortedSubjects = [...subjects].sort(
          (a, b) => b.priority - a.priority
        );
      
        let currentHour = 9;
        let currentMinute = 0;
      
        let y = 40;
      
        sortedSubjects.forEach((subject) => {
      
          let studyMinutes = 45;
      
          if (subject.priority >= 700)
            studyMinutes = 120;
          else if (subject.priority >= 500)
            studyMinutes = 90;
          else if (subject.priority >= 300)
            studyMinutes = 60;
      
          const startTime =
            `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;
      
          let endMinutes =
            currentHour * 60 +
            currentMinute +
            studyMinutes;
      
          const endHour =
            Math.floor(endMinutes / 60);
      
          const endMinute =
            endMinutes % 60;
      
          const endTime =
            `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
      
          doc.text(
            `${startTime} - ${endTime}`,
            20,
            y
          );
      
          doc.text(
            `${subject.name}`,
            70,
            y
          );
      
          doc.text(
            `Priority: ${subject.priority}`,
            130,
            y
          );
      
          currentHour = endHour;
          currentMinute = endMinute + 15;
      
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute -= 60;
          }
      
          y += 15;
      
          if (y > 260) {
            doc.addPage();
            y = 20;
          }
        });
      
        doc.save("StudyTimetable.pdf");
      };

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
📚 Study Analytics Dashboard      <button
  onClick={handleLogout}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Logout
</button> </h1>

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

  <button
  onClick={exportPDF}
  style={{
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  📅 Generate Study Timetable
</button>

  <h2>Subjects</h2>

  
  
  <SubjectChart subjects={subjects} />
  <input
  type="text"
  placeholder="🔍 Search Subject..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="inputBox"
/>
<br/><br/>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    }}
  >
    
    {filteredSubjects.map((subject, index) => (
      <div
        key={subject.id}
        style={{
          background: "#1e293b",
          borderRadius: "15px",
          padding: "20px",
          transition: "0.3s",
        }}
      >
        <h3>{subject.name}</h3>

        <p>Difficulty: {subject.difficulty}</p>

        <p>Knowledge: {subject.proficiency}%</p>

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
        <button
  onClick={() => handleDelete(subject.id)}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  Delete
</button>
      </div>
    ))}
</div>
<br/><br/>
{topSubject && (
  <div
    style={{
      background: "#1e293b",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      border: "2px solid #38bdf8",
      marginBottom: "25px",
      fontWeight: "bold",
    }}
  >
    <h3> Today's Focus:</h3>

    <h2>❄ {topSubject.name}  </h2>

    <h7>
      It Has Higher Priority -
      {topSubject.priority}
      </h7>

  </div>

  
)}

 <br/><br/>
  <div
  style={{
    background:
      "linear-gradient(135deg,#1e293b,#0f172a)",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px",
    border:
      "1px solid rgba(255,255,255,0.1)",
  }}
>
  <h2>📈 Study Insights</h2>

  <p>
    🔥 Highest Priority:
    <strong>
      {" "}
      {highestPriority?.name}
    </strong>
  </p>

  <p>
    ⚡ Most Difficult:
    <strong>
      {" "}
      {mostDifficult?.name}
    </strong>
  </p>

  <p>
    🧠 Strongest Subject:
    <strong>
      {" "}
      {strongestSubject?.name}
    </strong>
  </p>

  <p>
    📚 Average Knowledge:
    <strong>
      {" "}
      {avgKnowledge}%
    </strong>
  </p>
</div>
  
</div>

);
}

export default Subjects;
