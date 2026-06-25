

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    } from "recharts";
    
    function SubjectChart({ subjects }) {
        
    return (
    <div
    style={{
        background:
        "linear-gradient(135deg,#1e293b,#0f172a)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "30px",
    }}
    >
    <h2
    style={{
    color: "white",
    marginBottom: "20px",
    }}
    >
    📊 Subject Priorities </h2>
    
    
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={subjects}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
  dataKey="priority"
  radius={[10, 10, 0, 0]}
  fill="#38bdf8"
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    
    
    );
    }
    
    export default SubjectChart;
    