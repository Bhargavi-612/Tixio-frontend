import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TicketDashboard from './TicketDashboard'
import TicketHistory from './TicketHistory'
import { useState } from 'react'
import AnalyticsPage from './AnalyticsPage'

export default function TeamPage() {
  const { role: paramRole } = useParams()
  const role = paramRole || 'admin'
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  const roleMap = {
    admin: 'Admin',
    billing: 'Billing',
    tech: 'Tech Support',
    sales: 'Sales',
    hr: 'HR',
    it: 'IT'
  };
  
  const team1 = roleMap[role.toLowerCase()];

  const tabClass = tab =>
        `${activeTab === tab ? 'text-teal-600 font-semibold' : 'text-gray-600 hover:bg-gray-200'}`

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-cover"
    style={{ backgroundImage: "url('https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9980.jpg?semt=ais_hybrid&w=740')" }}>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-700">Tixio - {team1}</h1>

        <nav className="flex items-center gap-6">
          {/* <NavLink
            to={`/${role}/dashboard`}
            className={({ isActive }) =>
              isActive ? 'text-teal-600 font-semibold' : 'text-gray-600'
            }
          >
            Ticket Dashboard
          </NavLink>
          <NavLink
            to={`/${role}/history`}
            className={({ isActive }) =>
              isActive ? 'text-teal-600 font-semibold' : 'text-gray-600'
            }
          >
            Ticket History
          </NavLink>

          {role === 'admin' && (
            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                isActive ? 'text-teal-600 font-semibold' : 'text-gray-600'
              }
            >
              Analytics
            </NavLink>
          )} */}

        <button className={tabClass('dashboard')} onClick={() => setActiveTab('dashboard')}>Ticket Dashboard</button>
         <button className={tabClass('history')} onClick={() => setActiveTab('history')}>Ticket History</button>
         {role==='admin' && <button className={tabClass('analytics')} onClick={() => setActiveTab('analytics')}>Analytics</button>}

          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Content area */}
      <div className="mt-4">
         {activeTab === 'dashboard' ? <TicketDashboard embedded /> : activeTab=== 'history'? <TicketHistory embedded />: <AnalyticsPage embedded />}
     </div>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
