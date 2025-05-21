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
import AdminPage from './pages/AdminPage';
import { AdminRoute ,ProtectedRoute} from './components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <NavBar />
          <Routes>
            <Route path="/adminhomepage" element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <HomePageUser />
              </ProtectedRoute>
            } />
            <Route path="/articles" element={
              <ProtectedRoute>
                <ArticlesPage />
              </ProtectedRoute>
            } />
            <Route path="/articledetail/:id" element={
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>
            } />
           
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            {/* Routes publiques */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Redirection */}
            <Route path="/admin" element={<Navigate to="/adminhomepage" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App