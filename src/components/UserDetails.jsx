import React, { useState } from 'react';
import articlesData from '../data/articlesData';

const UserDetails = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState('info');
    const userArticles = articlesData.filter(article => article.auteur === user.id);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* En-tête du modal */}
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Détails de l'utilisateur</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Onglets */}
                <div className="flex border-b">
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('info')}
                    >
                        Informations
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'articles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('articles')}
                    >
                        Articles ({userArticles.length})
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'scores' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('scores')}
                    >
                        Scores ({user.scores?.length || 0})
                    </button>
                </div>

                {/* Contenu */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:space-x-4">
                                <div className="md:w-1/3 space-y-4">
                                    <div className="flex items-center justify-center">
                                        <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-medium">
                                            {user.nom.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium">{user.nom}</h4>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Utilisateur'}
                                        </span>
                                    </div>
                                </div>
                                <div className="md:w-2/3 mt-4 md:mt-0">
                                    <h4 className="text-lg font-medium mb-4">Informations de base</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">ID</label>
                                            <p className="mt-1 text-sm text-gray-900">{user.id}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nom complet</label>
                                            <p className="mt-1 text-sm text-gray-900">{user.nom}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nom d'utilisateur</label>
                                            <p className="mt-1 text-sm text-gray-900">{user.username}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Rôle</label>
                                            <p className="mt-1 text-sm text-gray-900">{user.role}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Date de création</label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {new Date(user.dateCreation).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Modifier
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'articles' && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Articles publiés</h4>
                            {userArticles.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {userArticles.map(article => (
                                        <li key={article.id} className="py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-900">{article.titre}</h5>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(article.datePublication).toLocaleDateString('fr-FR')} · {article.categorie}
                                                    </p>
                                                </div>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.statut === 'PUBLIÉ' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {article.statut}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                                {article.contenu.substring(0, 150)}...
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">Cet utilisateur n'a pas encore publié d'articles.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'scores' && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium">Scores des quiz</h4>
                            {user.scores && user.scores.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {user.scores.map(score => (
                                                <tr key={score.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{score.quiz}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${score.value >= 80 ? 'bg-green-100 text-green-800' :
                                                                    score.value >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                }`}>
                                                                {score.value}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(score.date).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Voir</button>
                                                        <button className="text-red-600 hover:text-red-900">Supprimer</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Cet utilisateur n'a pas encore de scores.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Pied du modal */}
                <div className="px-6 py-3 bg-gray-50 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserDetails