import { useState } from 'react'
import axios from 'axios'

export default function FaqPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [step, setStep] = useState(1)

  const API_URL = process.env.REACT_APP_BACKEND_URL

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/api/tickets/search-similar`, { query })
      console.log('API response:', res.data) // Inspect response
      setResults(res.data.results) // FIXED: Access the array correctly
      setStep(2)
    } catch (err) {
      console.error('Error fetching replies:', err)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setQuery('')
    setResults([])
    setStep(1)
  }

  return (
    <div className="min-h-screen bg-[#000614] text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full px-8 py-4 bg-[#070f24] shadow-md flex items-center space-x-3">
        <img src="/tixio-2.png" alt="Tixio Logo" className="h-10" />
        <h1 className="text-2xl font-bold">Help Center</h1>
      </header>

      <main className="flex flex-col items-center mt-20 px-4 w-full max-w-2xl">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Describe your issue</h2>
            <textarea
              rows="4"
              placeholder="Type your issue..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg p-4 bg-[#1f2937] text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#00bfda]"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#00bfda] hover:bg-[#044a73] text-white py-2 px-6 rounded-md font-medium transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-6">Similar Issues Found</h2>
            {results.length === 0 ? (
              <p className="mb-6 text-gray-400">No similar issues found.</p>
            ) : (
              <ul className="space-y-4 w-full mb-6">
                {results.map((item, index) => (
                  <li key={index} className="bg-[#1f2937] p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-[#00bfda]">{item.subject}</h3>
                    <p className="text-gray-300">{item.summary}</p>
                    {item.reply && (
                      <p className="text-sm text-green-400 mt-2">
                        <strong>Suggested Reply:</strong> {item.reply}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Similarity: {(item.similarityScore * 100).toFixed(1)}%
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex space-x-4">
              <button
                onClick={reset}
                className="border border-[#00bfda] text-[#00bfda] hover:bg-[#044a73] hover:text-white py-2 px-4 rounded-md transition"
              >
                This helped
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
