import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const API_URL = process.env.REACT_APP_BACKEND_URL

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      })
      const { token, user } = res.data
      localStorage.setItem('token', token)
      setUser(user)

      if (user.role === 'admin') navigate('/admin')
      else navigate(`/team/${user.role}`)
    } catch (err) {
      alert('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundColor: '#000614',
        backgroundImage: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fphotos%2Fnavy-blue-background.html&psig=AOvVaw28dsqIwD8aD34JyiYn0zc6&ust=1746900302149000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCV0vX8lo0DFQAAAAAdAAAAABAQ')"
      }}
    >
      {/* Header */}
      <header className="w-full px-8 py-4 bg-[#070f24] bg-opacity-80 shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/tixio-2.png" alt="Tixio Logo" className="h-10" />
          {/* <h1 className="text-3xl font-bold text-[#101728]">Tixio</h1> */}
        </div>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center mt-20">
        <form
          onSubmit={handleLogin}
          className="bg-[#070f24] bg-opacity-90 rounded-2xl p-8 w-full max-w-sm shadow-2xl"
        >
          <h2 className="text-white text-2xl font-semibold text-center mb-6">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 rounded-md bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00bfda]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 mb-6 rounded-md bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00bfda]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00bfda] hover:bg-[#044a73] text-white py-3 rounded-md font-medium transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* About Us Section */}
      <section className="mt-20 px-8 text-center text-white bg-black bg-opacity-50 py-8">
        <h3 className="text-xl font-semibold mb-2">About Us</h3>
        <p className="max-w-2xl mx-auto">
          Tixio is a smart email-based ticketing platform designed to simplify your internal support workflow.
          With AI-powered parsing and real-time dashboards for each team, Tixio helps you stay on top of every request.
        </p>
      </section>
    </div>
  )
}
