import { useParams, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TicketDashboard from './TicketDashboard'
import TicketHistory from './TicketHistory'
import AnalyticsPage from './AnalyticsPage'
import { useState } from 'react'
import { Menu, X } from 'lucide-react' // use `npm install lucide-react`

export default function TeamPage() {
  const { role: paramRole } = useParams()
  const role = paramRole || 'admin'
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isOpen, setIsOpen] = useState(false)

  const roleMap = {
    admin: 'Admin',
    billing: 'Billing',
    tech: 'Tech Support',
    sales: 'Sales',
    hr: 'HR',
    it: 'IT'
  }

  const team1 = roleMap[role.toLowerCase()]

  const tabClass = (tab) =>
    `${activeTab === tab ? 'text-teal-400 font-semibold' : 'text-gray-100 hover:text-[#00bfda]'} block px-3 py-2`

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundColor: '#000614'
      }}
    >
      {/* Header */}
      <header className="bg-[#070f24] shadow-md p-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/tixio-2.png" alt="Tixio Logo" className="h-10" />
          <h1 className="text-sm font-bold text-teal-500">{team1}</h1>
        </div>

        {/* Hamburger Button (Mobile only) */}
        <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <nav className={`w-full md:w-auto md:flex md:items-center gap-4 ${isOpen ? 'block' : 'hidden'}`}>
          <button className={tabClass('dashboard')} onClick={() => setActiveTab('dashboard')}>
            Ticket Dashboard
          </button>
          <button className={tabClass('history')} onClick={() => setActiveTab('history')}>
            Ticket History
          </button>
          {role === 'admin' && (
            <button className={tabClass('analytics')} onClick={() => setActiveTab('analytics')}>
              Analytics
            </button>
          )}
          <button
            onClick={handleLogout}
            className="mt-2 md:mt-0 bg-[#00bfda] text-white px-3 py-1 rounded hover:bg-[#044a73] transition"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Content area */}
      <div className="mt-4">
        {activeTab === 'dashboard' ? (
          <TicketDashboard embedded />
        ) : activeTab === 'history' ? (
          <TicketHistory embedded />
        ) : (
          <AnalyticsPage embedded />
        )}
      </div>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
