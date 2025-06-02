// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TeamPage from './pages/TeamPage'
import TicketDashboard from './pages/TicketDashboard'
import TicketHistory from './pages/TicketHistory'
import AnalyticsPage from './pages/AnalyticsPage'
import FaqPage from './pages/FAQPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Placeholder routes */}
        <Route path="/team/:role" element={<TeamPage />}/>
        {/* <Route path="/:role/dashboard" element={<TicketDashboard />} />
        <Route path="/:role/history" element={<TicketHistory />} /> */}

        <Route path="/admin" element={<TeamPage />}/>
          {/* <Route path="dashboard" element={<TicketDashboard />} /> */}
          {/* <Route path="history" element={<TicketHistory />} /> */}
          {/* <Route path="/admin/analytics" element={<AnalyticsPage />} /> */}
          <Route path="/faq" element={<FaqPage />}/>
      </Routes>
    </Router>
  )
}

export default App
