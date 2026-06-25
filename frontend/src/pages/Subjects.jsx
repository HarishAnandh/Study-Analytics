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
const [user, setUser] = useState(null);

useEffect(() => {
  fetchSubjects();

  supabase.auth.getUser().then(
    ({ data }) => {
      setUser(data.user);
    }
  );
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
          "Study Analytics Timetable",
          20,
          20
        );
      
        const [startHour, startMinute] =
          startTime.split(":").map(Number);
      
        const [endHour, endMinute] =
          endTime.split(":").map(Number);
      
        const totalMinutes =
          (endHour * 60 + endMinute) -
          (startHour * 60 + startMinute);
      
        const sortedSubjects =
          [...subjects].sort(
            (a, b) =>
              b.priority - a.priority
          );
      
        const totalPriority =
          sortedSubjects.reduce(
            (sum, s) =>
              sum + Number(s.priority),
            0
          );
      
        let currentTime =
          startHour * 60 +
          startMinute;
      
        let y = 40;
      
        sortedSubjects.forEach(
          (subject) => {
      
            const allocatedMinutes =
              Math.max(
                30,
                Math.floor(
                  (subject.priority /
                    totalPriority) *
                  totalMinutes
                )
              );
      
            const startH =
              Math.floor(
                currentTime / 60
              );
      
            const startM =
              currentTime % 60;
      
            const endTimeMinutes =
              currentTime +
              allocatedMinutes;
      
            const endH =
              Math.floor(
                endTimeMinutes / 60
              );
      
            const endM =
              endTimeMinutes % 60;
      
            const startLabel =
              `${String(startH).padStart(2,"0")}:${String(startM).padStart(2,"0")}`;
      
            const endLabel =
              `${String(endH).padStart(2,"0")}:${String(endM).padStart(2,"0")}`;
      
            doc.text(
              `${startLabel} - ${endLabel}`,
              20,
              y
            );
      
            doc.text(
              subject.name,
              70,
              y
            );
      
            y += 12;
      
            currentTime =
              endTimeMinutes;
      
            if (y > 260) {
              doc.addPage();
              y = 20;
            }
          }
        );
      
        doc.save(
          "StudyTimetable.pdf"
        );
      };

const [startTime, setStartTime] =
  useState("09:00");

const [endTime, setEndTime] =
  useState("18:00");
  const totalSubjects =
  subjects.length;


const highestPrioritySubject =
  subjects.length > 0
    ? subjects.reduce(
        (prev, curr) =>
          prev.priority >
          curr.priority
            ? prev
            : curr
      )
    : null;
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
    marginLeft: "20%",
    color: "Aqua",
    }}>

 🦕 Snippa  


<button
  onClick={handleLogout}
  style={{
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "10%",
  }}
>
  Logout
</button>
</h1>

<h1
style={{
textAlign: "center",
marginBottom: "30px",
}}
>
 
 Study Analytics Dashboard    </h1>

<p style={{
textAlign: "center",
marginBottom: "30px",
color: "gray"
}}>By Harish Anandh</p>

<div
  style={{
    background:
      "linear-gradient(135deg,#1e293b,#0f172a)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "25px",
    border:
      "1px solid rgba(255,255,255,0.1)",
  }}
>
  <h2>👤 User Profile</h2>

  <p>
    Email:
    <strong>
      {" "}
      {user?.email}
    </strong>
  </p>

  <p>
    Subjects Added:
    <strong>
      {" "}
      {totalSubjects}
    </strong>
  </p>

  <p>
    Average Knowledge:
    <strong>
      {" "}
      {avgKnowledge}%
    </strong>
  </p>

  <p>
    Highest Priority:
    <strong>
      {" "}
      {highestPrioritySubject?.name || "N/A"}
    </strong>
  </p>
</div>

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

  <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
    marginLeft: "45%",
  }}
>
  <div>
    <label>Start Time</label>
    <br />
    <input
      type="time"
      value={startTime}
      onChange={(e) =>
        setStartTime(e.target.value)
      }
      className="inputBox"
    />
  </div>

  <div>
    <label>End Time</label>
    <br />
    <input
      type="time"
      value={endTime}
      onChange={(e) =>
        setEndTime(e.target.value)
      }
      className="inputBox"
    />
  </div>
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
    marginLeft: "46%",
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
