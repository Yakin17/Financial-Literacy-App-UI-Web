import React from 'react';

const ScoreDetails = ({ score, utilisateurName, quizQuestion, onClose, onEdit, onDelete }) => {
    // Formater la date pour l'affichage
    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Détails du Score</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">ID</p>
                                <p className="font-medium">{score.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Points obtenus</p>
                                <p className="font-medium">{score.pointsObtenus}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Utilisateur</p>
                                <p className="font-medium">{utilisateurName}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Quiz</p>
                                <p className="font-medium">{quizQuestion}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Date de passage</p>
                                <p className="font-medium">{formatDate(score.datePassage)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Fermer
                        </button>
                        <button
                            onClick={onEdit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Éditer
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreDetails;