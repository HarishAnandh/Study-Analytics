import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "../theme.css";

const TIER_COLORS = ["#FF5A5F", "#FFB800", "#6C5CE7", "#00C896"];

function getTierColor(priority, maxPriority) {
  if (maxPriority <= 0) return TIER_COLORS[3];
  const ratio = priority / maxPriority;
  if (ratio > 0.75) return TIER_COLORS[0];
  if (ratio > 0.5) return TIER_COLORS[1];
  if (ratio > 0.25) return TIER_COLORS[2];
  return TIER_COLORS[3];
}

function SubjectChart({ subjects }) {
  const maxPriority =
    subjects.length > 0 ? Math.max(...subjects.map((s) => Number(s.priority))) : 0;

  return (
    <div className="card card-pad" style={{ marginBottom: "28px" }}>
      <div className="flex-row gap-8" style={{ marginBottom: "4px" }}>
        <span style={{ fontSize: "20px" }}>📊</span>
        <h2 style={{ fontSize: "19px" }}>Subject priorities</h2>
      </div>
      <p className="muted" style={{ fontSize: "13px", marginTop: "4px", marginBottom: "16px" }}>
        Taller bars need your attention first.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={subjects} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontFamily: "Inter", fontSize: 12, fill: "#6B6862" }}
            axisLine={{ stroke: "rgba(32,32,29,0.15)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: "Inter", fontSize: 12, fill: "#6B6862" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#20201D",
              border: "none",
              borderRadius: "10px",
              fontFamily: "Inter",
              fontSize: 13,
            }}
            labelStyle={{ color: "#FFF6E9", fontWeight: 600 }}
            itemStyle={{ color: "#FFF6E9" }}
          />
          <Bar dataKey="priority" radius={[10, 10, 0, 0]}>
            {subjects.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getTierColor(Number(entry.priority), maxPriority)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SubjectChart;