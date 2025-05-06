import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar';
import HomePageUser from './pages/HomePageUser';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePageUser />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articledetail/:id" element={<ArticleDetailPage />} />
        </Routes>
      </div>
      
    </BrowserRouter>
  )
}

export default App
