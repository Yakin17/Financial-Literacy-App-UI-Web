import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar';
import HomePageUser from './pages/HomePageUser';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePageUser />} />
            <Route path="/home" element={<HomePageUser />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articledetail/:id" element={<ArticleDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Navigate to="/" />} /> {/* Placeholder for admin route */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App