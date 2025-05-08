import React, { useState, useEffect, useContext } from 'react';
import SearchBar from './ui/SearchBar';
import { utilisateurService } from '../services/apiService';
import UserDetails from './UserDetails';
import { AuthContext } from '../contexts/AuthContext';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getToken, currentUser } = useContext(AuthContext); // Modified line: added currentUser

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await utilisateurService.getAll();
            setUsers(response.data);
            setFilteredUsers(response.data);
            setError(null);
        } catch (err) {
            console.error("Erreur lors de la récupération des utilisateurs", err);
            setError("Impossible de charger les utilisateurs. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Vérifier si le token est disponible
        if (getToken()) {
            fetchUsers();
        }
    }, [getToken]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = users.filter(
                user =>
                    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const viewUserDetails = (user) => {
        setSelectedUser(user);
        setShowUserDetails(true);
    };

    const closeUserDetails = () => {
        setShowUserDetails(false);
        setSelectedUser(null);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleAddUser = async (userData) => {
        try {
            await utilisateurService.create(userData);
            fetchUsers(); // Rafraîchir la liste après l'ajout
            closeAddModal();
        } catch (err) {
            console.error("Erreur lors de la création de l'utilisateur", err);
            alert("Une erreur s'est produite lors de la création de l'utilisateur");
        }
    };

    const handleEditUser = async (userData) => {
        try {
            await utilisateurService.update(selectedUser.id, userData);
            fetchUsers(); // Rafraîchir la liste après la modification
            closeEditModal();
        } catch (err) {
            console.error("Erreur lors de la modification de l'utilisateur", err);
            alert("Une erreur s'est produite lors de la modification de l'utilisateur");
        }
    };

    const handleDeleteUser = async () => {
        try {
            await utilisateurService.delete(selectedUser.id);
            fetchUsers(); // Rafraîchir la liste après la suppression
            closeDeleteModal();
        } catch (err) {
            console.error("Erreur lors de la suppression de l'utilisateur", err);
            alert("Une erreur s'est produite lors de la suppression de l'utilisateur");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Ajouter un utilisateur
                </button>
            </div>

            <SearchBar
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={handleSearch}
            />

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom d'utilisateur
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rôle
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date de création
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.username}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Utilisateur'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.dateCreation).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewUserDetails(user)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Éditer
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(user)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Aucun utilisateur trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal pour afficher les détails de l'utilisateur */}
            {showUserDetails && selectedUser && (
                <UserDetails
                    user={selectedUser}
                    onClose={closeUserDetails}
                    onEdit={() => {
                        closeUserDetails();
                        openEditModal(selectedUser);
                    }}
                    onDelete={() => {
                        closeUserDetails();
                        openDeleteModal(selectedUser);
                    }}
                />
            )}

            {/* Modal pour ajouter un utilisateur */}
            {showAddModal && (
                <AddUserModal
                    onClose={closeAddModal}
                    onSave={handleAddUser}
                />
            )}

            {/* Modal pour modifier un utilisateur */}
            {showEditModal && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={closeEditModal}
                    onSave={handleEditUser}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && selectedUser && (
                <DeleteConfirmModal
                    user={selectedUser}
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteUser}
                />
            )}
        </div>
    );
};

export default UserManagement;