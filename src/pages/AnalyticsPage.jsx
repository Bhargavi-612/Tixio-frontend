import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/tickets/analytics`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-6 text-gray-200">Loading analytics...</div>;

  const {
    statusCounts,
    priorityCounts,
    teamCounts,
    createdOverTime
  } = data;

  return (
    <div className="p-6 text-gray-300 flex flex-col items-center">
      <div className="max-w-screen-lg w-full space-y-10">
        <h1 className="text-3xl font-bold text-center">Ticket Analytics</h1>

        {/* Tickets by Status - Pie Chart */}
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">Tickets by Status</h2>
          <PieChart width={400} height={350}>
            <Pie
              data={statusCounts}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {statusCounts.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </section>

        {/* Tickets by Priority - Bar Chart */}
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">Tickets by Priority</h2>
          <BarChart width={600} height={300} data={priorityCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" label={{ value: 'Priority', position: 'insideBottom', offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </section>

        {/* Tickets by Team - Bar Chart */}
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">Tickets by Team</h2>
          <BarChart width={600} height={300} data={teamCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" label={{ value: 'Team', position: 'insideBottom', offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FFBB28" />
          </BarChart>
        </section>

        {/* Tickets Over Time - Line Chart */}
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-center">Tickets Created Over Time</h2>
          <LineChart width={800} height={300} data={createdOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#0088FE" />
          </LineChart>
        </section>
      </div>
    </div>
  );
}
