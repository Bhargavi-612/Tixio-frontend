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

  const API_URL=process.env.REACT_APP_BACKEND_URL;

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
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/503/398/475/gradient-shapes-abstract-minimalism-wallpaper-preview.jpg')" }}
    >
      {/* Header */}
      <header className="w-full px-8 py-4 bg-white bg-opacity-80 shadow-md">
        <h1 className="text-2xl font-bold text-teal-700">MailMorph</h1>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center mt-20">
        <form
          onSubmit={handleLogin}
          className="bg-white bg-opacity-90 shadow-lg rounded px-8 pt-6 pb-8 w-96"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring focus:border-teal-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mb-6 border rounded focus:outline-none focus:ring focus:border-teal-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* About Us Section */}
      <section className="mt-20 px-8 text-center text-white bg-black bg-opacity-50 py-8">
        <h3 className="text-xl font-semibold mb-2">About Us</h3>
        <p className="max-w-2xl mx-auto">
        MailMorph is a smart email-based ticketing platform designed to simplify your internal support workflow. 
          With AI-powered parsing and real-time dashboards for each team, MailMorph helps you stay on top of every request.
        </p>
      </section>
    </div>
  )
}
