import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TicketDashboard() {
  const { role: team } = useParams()
  const role = team || 'admin'
  // const team1 = role.charAt(0).toUpperCase() + role.slice(1)

  const roleMap = {
    admin: 'Admin',
    billing: 'Billing',
    tech: 'Tech Support',
    sales: 'Sales',
    hr: 'HR',
    it: 'IT'
  };
  
  const team1 = roleMap[role.toLowerCase()];

  const [tickets, setTickets] = useState([])
  const [expandedTicketId, setExpandedTicketId] = useState(null)
  const [replyText, setReplyText] = useState({}) // map ticketId -> reply string

  const API_URL = process.env.REACT_APP_BACKEND_URL

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

  const sendReply = async (id, message) => {
    if (!message.trim()) return
    await fetch(`${API_URL}/api/tickets/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
    setReplyText(prev => ({ ...prev, [id]: '' }))
    alert('Reply sent!')
    closeTicket(id)
  }

  const priorityColors = ['bg-red-900', 'bg-orange-500', 'bg-yellow-600', 'bg-green-700', 'bg-green-300']

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {tickets.map(ticket => {
        const isExpanded = expandedTicketId === ticket._id
        const priorityColor = priorityColors[ticket.priority - 1] || 'bg-teal-300'

        return (
          <div
            key={ticket._id}
            className="bg-[#070f24] bg-opacity-80 shadow rounded-xl overflow-hidden border-[#0a1c2b] mx-5 "
          >
            <div className={`flex justify-between items-center px-3 py-2`}>
              <div className='flex'>
              <div className={`text-lg text-white font-semibold rounded-md ${priorityColor} px-3`}>{ticket.priority}</div>
              <span className="text-lg text-white font-semibold mx-4">{ticket.subject}</span>
              </div>
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

            <div className="p-3 text-sm text-white m-2">
              {/* <p><span className="font-semibold">Priority:</span> {ticket.priority}</p> */}
              {role === 'admin' && (
                <p className="whitespace-pre-line"><span className="font-semibold text-teal-300 text-md">Team:</span> {ticket.team}</p>
              )}
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold text-teal-300 text-md">From:</span> {ticket.sender}</p>
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold text-teal-300 text-md">Date:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
              <p className="mt-2 whitespace-pre-line"><span className="font-semibold text-teal-300 text-md">Summary:</span> {ticket.summary}</p>
              {isExpanded && (
                <>
                  <p className="mt-2 whitespace-pre-line"><span className="font-semibold text-teal-300 text-md">Body:</span> {ticket.body}</p>
                  {ticket.status === 'open' && (
                    <div className="mt-3">
                      <textarea
                        className="w-full p-2 border rounded mb-2 text-sm text-black"
                        placeholder="Type your reply..."
                        value={replyText[ticket._id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [ticket._id]: e.target.value }))}
                      />
                      <button
                        onClick={() => sendReply(ticket._id, replyText[ticket._id])}
                        className="bg-[#00bfda] text-white px-3 py-1 rounded hover:bg-[#044a73]"
                      >
                        Send Reply & Close Ticket
                      </button>
                    </div>
                  )}
                  {ticket.status !== 'open' && ticket.reply && (
                    <p className="mt-3 whitespace-pre-line">
                      <span className="font-semibold text-teal-300 text-md">Reply:</span> {ticket.reply}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
