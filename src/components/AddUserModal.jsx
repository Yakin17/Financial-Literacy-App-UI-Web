import React, { useState } from 'react'


const AddUserModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nom: '',
        username: '',
        email: '',
        motDePasse: '',
        role: 'ROLE_USER'
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est requis';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Le nom d\'utilisateur est requis';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.motDePasse.trim()) {
            newErrors.motDePasse = 'Le mot de passe est requis';
        } else if (formData.motDePasse.length < 6) {
            newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Ajouter un utilisateur</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom complet</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.nom ? 'border-red-500' : ''}`}
                            />
                            {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                type="password"
                                id="motDePasse"
                                name="motDePasse"
                                value={formData.motDePasse}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.motDePasse ? 'border-red-500' : ''}`}
                            />
                            {errors.motDePasse && <p className="mt-1 text-sm text-red-600">{errors.motDePasse}</p>}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="ROLE_USER">Utilisateur</option>
                                <option value="ROLE_ADMIN">Administrateur</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUserModal
