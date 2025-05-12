import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import UserManagement from './UserManagement';
import { AuthContext } from '../contexts/AuthContext';
import ArticleManagement from './ArticleManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { currentUser, isAdmin, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est un admin et rediriger sinon
    useEffect(() => {
        if (!loading && !currentUser) {
            navigate('/login');
            return;
        }

        if (!loading && currentUser && !isAdmin()) {
            navigate('/home');
        }
    }, [currentUser, isAdmin, loading, navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement />;
            
            case 'articles':
                return <ArticleManagement/>;
            // D'autres sections peuvent être ajoutées ici (articles, scores, etc.)
            default:
                return <UserManagement />;
        }
    };

    // Si en cours de chargement ou pas d'utilisateur, afficher un écran de chargement
    if (loading || !currentUser) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Chargement...</p>
                </div>
            </div>
        );
    }

    // Si l'utilisateur n'est pas admin, rediriger (bien que cela soit déjà géré dans useEffect)
    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;