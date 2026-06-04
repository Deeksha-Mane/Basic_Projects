import React from 'react' // Add this import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import ThemeProvider from './contexts/ThemeContext.jsx'
import AuthProvider, { useAuth } from './contexts/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import "./index.css";


// ProtectedRoute component for authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />  {/* remove ProtectedRoute */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/feed" />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App