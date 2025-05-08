import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TicketDashboard() {
  const { role: team } = useParams()
  const role = team || 'admin'
  const team1 = role.charAt(0).toUpperCase()+role.slice(1)
  const [tickets, setTickets] = useState([])
  const [expandedTicketId, setExpandedTicketId] = useState(null)

  const API_URL=process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/tickets?team=${team1}&status=open`)
      .then(res => res.json())
      .then(setTickets)
      .catch(console.error)
  }, [team])

  const closeTicket = id =>
    fetch(`${API_URL}/api/tickets/${id}/close`, { method: 'PUT' })
      .then(() => setTickets(t => t.filter(ticket => ticket._id !== id)))

  const spamTicket = id =>
    fetch(`${API_URL}/api/tickets/${id}/spam`, { method: 'PUT' })
      .then(() => setTickets(t => t.filter(ticket => ticket._id !== id)))

  const priorityColors = ['bg-teal-900', 'bg-teal-700', 'bg-teal-500', 'bg-teal-300']

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* HIiiiiiiiiiiiiiiiiii {team1} */}
      {tickets.map(ticket => {
        const isExpanded = expandedTicketId === ticket._id
        const priorityColor = priorityColors[ticket.priority - 1] || 'bg-teal-300'

        return (
          <div
            key={ticket._id}
            className="bg-white bg-opacity-80 shadow rounded-lg overflow-hidden border border-gray-200 mx-5"
          >
            <div className={`flex justify-between items-center px-3 py-2 ${priorityColor}`}>
              <span className="text-sm text-white font-semibold">{ticket.subject}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setExpandedTicketId(isExpanded ? null : ticket._id)}
                  title="View details"
                  className="text-white hover:opacity-80"
                >
                  ℹ️
                </button>
                <button
                  onClick={() => closeTicket(ticket._id)}
                  title="Close ticket"
                  className="text-white hover:opacity-80"
                >
                  ✅
                </button>
                <button
                  onClick={() => spamTicket(ticket._id)}
                  title="Mark as spam"
                  className="text-white hover:opacity-80"
                >
                  🚫
                </button>
              </div>
            </div>

            <div className="p-3 text-sm text-gray-700">
            <p><span className="font-semibold">Priority:</span> {ticket.priority}</p>
            {role === 'admin' && <p className="mt-2 whitespace-pre-line"><span className="font-semibold">Team:</span> {ticket.team}</p>}
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold">From:</span> {ticket.sender}</p>
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold">Date:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold">Summary:</span> {ticket.summary}</p>
              {isExpanded && (
                <>
                  <p className="mt-2 whitespace-pre-line"><span className="font-semibold">Body:</span> {ticket.body}</p>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
