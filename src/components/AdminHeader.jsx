
import React, { useState } from 'react';

const AdminHeader = ({ setSidebarOpen }) => {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Données admin fictives (à remplacer par des données réelles)
    const admin = {
        name: 'Admin Principal',
        email: 'admin@financialliteracy.com',
        avatar: 'https://via.placeholder.com/40'
    };

    const handleLogout = () => {
        // Implémentez la logique de déconnexion ici
        console.log('Déconnexion...');
        // Rediriger vers la page de connexion
    };

    return (
        <header className="sticky top-0 z-20 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Bouton de menu mobile */}
                <button
                    className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                    onClick={() => setSidebarOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Titre */}
                <h1 className="text-lg font-semibold text-gray-800 md:text-xl">Panneau d'administration</h1>

                {/* Profil et déconnexion */}
                <div className="relative">
                    <button
                        className="flex items-center space-x-2"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    >
                        <span className="hidden md:block text-sm font-medium text-gray-700">{admin.name}</span>
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {admin.name.charAt(0)}
                        </div>
                    </button>

                    {/* Dropdown du profil */}
                    {profileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                                <p className="text-xs text-gray-500 truncate">{admin.email}</p>
                            </div>
                            <a
                                href="#profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profil
                            </a>
                            <a
                                href="#settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Paramètres
                            </a>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};


export default AdminHeader
