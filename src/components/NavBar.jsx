import React from 'react'
import { useNavigate } from 'react-router';

function NavBar({ activePage}) {
    
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="text-blue-600 text-3xl font-bold mr-2">|</div>
                            <span className="text-2xl font-bold text-gray-800">FinEdu</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <button
                                onClick={() => navigateTo('home')}
                                className={`${activePage === 'home' ? 'text-blue-600' : 'text-gray-500'} px-3 py-2 text-sm font-medium`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => navigateTo('articles')}
                                className={`${activePage === 'articles' || activePage === 'article-detail' ? 'text-blue-600' : 'text-gray-500'} px-3 py-2 text-sm font-medium`}
                            >
                                Articles
                            </button>
                            <button
                                onClick={() => navigateTo('profile')}
                                className={`${activePage === 'profile' ? 'text-blue-600' : 'text-gray-500'} px-3 py-2 text-sm font-medium`}
                            >
                                Profile
                            </button>
                            <button className="text-gray-500 px-3 py-2 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    
  )
}

export default NavBar
