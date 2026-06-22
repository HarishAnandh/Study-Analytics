import { useState } from "react";

function Subjects() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [proficiency, setProficiency] = useState("");

  const [subjects, setSubjects] = useState([]);

  const handleSubmit = () => {
    if (!name) return;

    const newSubject = {
      name,
      difficulty,
      proficiency
    };

    setSubjects([...subjects, newSubject]);

    setName("");
    setDifficulty("");
    setProficiency("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Analytics</h1>

      <input
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Difficulty (1-5)"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Current Knowledge (%)"
        value={proficiency}
        onChange={(e) => setProficiency(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Save Subject
      </button>

      <hr />

      <h2>Subjects</h2>

      {subjects.map((subject, index) => (
        <div key={index}>
          <p>
            <strong>{subject.name}</strong>
          </p>

          <p>Difficulty: {subject.difficulty}</p>

          <p>Knowledge: {subject.proficiency}%</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Subjects;