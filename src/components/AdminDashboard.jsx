
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement />;
            // D'autres sections peuvent être ajoutées ici (articles, scores, etc.)
            default:
                return <UserManagement />;
        }
    };

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

    )
}

export default AdminDashboard;