import { useState } from 'react'
import { format } from 'date-fns'
import { Info, XCircle, ShieldX } from 'lucide-react'

const priorityColors = {
  high: 'bg-teal-800',
  medium: 'bg-teal-600',
  low: 'bg-teal-400',
}

export default function TicketCard({ ticket, onClose, onSpam }) {
  const [expanded, setExpanded] = useState(false)

  const handleInfoClick = () => setExpanded(!expanded)

  const priorityClass = priorityColors[ticket.priority] || 'bg-teal-300'

  return (
    <div className="relative rounded-2xl shadow-md bg-white/70 backdrop-blur-md border border-gray-200">
      {/* Priority band */}
      <div className={`flex items-center justify-between px-3 py-1 ${priorityClass} rounded-t-2xl`}>
        <span className="text-white text-sm font-semibold capitalize">{ticket.priority}</span>
        <div className="flex gap-2">
          <button onClick={handleInfoClick} className="text-white hover:text-gray-100">
            <Info size={16} />
          </button>
          <button onClick={() => onClose(ticket._id)} className="text-white hover:text-gray-100">
            <XCircle size={16} />
          </button>
          <button onClick={() => onSpam(ticket._id)} className="text-white hover:text-gray-100">
            <ShieldX size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        <div className="text-sm text-gray-600">
          <strong>From:</strong> {ticket.sender}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          <strong>Subject:</strong> {ticket.subject}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          <strong>Created:</strong> {format(new Date(ticket.createdAt), 'dd MMM yyyy, hh:mm a')}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          <strong>Summary:</strong> {ticket.summary}
        </div>

        {expanded && (
          <div className="text-sm text-gray-700 mt-2 space-y-1">
            <div><strong>Body:</strong> {ticket.body}</div>
          </div>
        )}
      </div>
    </div>
  )
}
