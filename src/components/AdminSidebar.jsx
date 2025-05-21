import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthContext';

// Icônes (vous pouvez utiliser heroicons ou un autre package d'icônes)
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const ArticlesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setSidebarOpen }) => {
    const { currentUser, isAdmin } = useContext(AuthContext);

    // Définir les éléments de navigation de la sidebar
    const navItems = [
        { id: 'dashboard', name: 'Tableau de bord', icon: <DashboardIcon /> },
        { id: 'users', name: 'Utilisateurs', icon: <UsersIcon /> },
        { id: 'articles', name: 'Articles', icon: <ArticlesIcon /> },
        
    ];

    return (
        <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 text-white transition duration-300 ease-in-out transform md:translate-x-0 md:static md:inset-0`}>
            {/* Logo et titre */}
            <div className="flex items-center justify-between h-16 px-4 bg-blue-900">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-wide">FinEdu Admin</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-1 rounded-md hover:bg-blue-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Informations de l'utilisateur */}
            {currentUser && (
                <div className="px-4 py-4 border-b border-blue-700">
                    <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-3">
                            {currentUser.nom ? currentUser.nom.charAt(0) : 'A'}
                        </div>
                        <div>
                            <h3 className="font-medium">{currentUser.nom || 'Admin'}</h3>
                            <p className="text-xs text-blue-300">{currentUser.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="text-xs bg-blue-700 px-2 py-1 rounded inline-block">
                            {currentUser.role || 'ROLE_ADMIN'}
                        </div>
                        {isAdmin() && (
                            <div className="text-xs bg-green-600 px-2 py-1 rounded inline-block ml-2">
                                Administrateur
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="px-2 pt-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`flex items-center w-full px-4 py-2 rounded-md hover:bg-blue-700 ${activeTab === item.id ? 'bg-blue-700' : ''
                                    }`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;