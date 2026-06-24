import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

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
      priority
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
  
      console.log("Saved to backend");
    } catch (error) {
      console.error(error);
    }
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