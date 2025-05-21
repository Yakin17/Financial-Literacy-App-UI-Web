import React, { useState } from 'react';

const AddScoreModal = ({ utilisateurs, quizzes, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        utilisateurId: '',
        quizId: '',
        pointsObtenus: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Réinitialiser l'erreur pour ce champ
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.utilisateurId) {
            newErrors.utilisateurId = 'L\'utilisateur est requis';
        }
        if (!formData.quizId) {
            newErrors.quizId = 'Le quiz est requis';
        }
        if (!formData.pointsObtenus) {
            newErrors.pointsObtenus = 'Les points sont requis';
        } else if (isNaN(Number(formData.pointsObtenus)) || Number(formData.pointsObtenus) < 0) {
            newErrors.pointsObtenus = 'Les points doivent être un nombre positif';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Ajouter un Score</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="utilisateurId" className="block text-sm font-medium text-gray-700">
                            Utilisateur
                        </label>
                        <select
                            id="utilisateurId"
                            name="utilisateurId"
                            value={formData.utilisateurId}
                            onChange={handleChange}
                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${errors.utilisateurId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">-- Sélectionner un utilisateur --</option>
                            {utilisateurs.map((utilisateur) => (
                                <option key={utilisateur.id} value={utilisateur.id}>
                                    {utilisateur.nom} {utilisateur.prenom || ''} ({utilisateur.email})
                                </option>
                            ))}
                        </select>
                        {errors.utilisateurId && (
                            <p className="mt-1 text-sm text-red-600">{errors.utilisateurId}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="quizId" className="block text-sm font-medium text-gray-700">
                            Quiz
                        </label>
                        <select
                            id="quizId"
                            name="quizId"
                            value={formData.quizId}
                            onChange={handleChange}
                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${errors.quizId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">-- Sélectionner un quiz --</option>
                            {quizzes.map((quiz) => (
                                <option key={quiz.id} value={quiz.id}>
                                    {quiz.question.substring(0, 50)}{quiz.question.length > 50 ? '...' : ''}
                                </option>
                            ))}
                        </select>
                        {errors.quizId && (
                            <p className="mt-1 text-sm text-red-600">{errors.quizId}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="pointsObtenus" className="block text-sm font-medium text-gray-700">
                            Points obtenus
                        </label>
                        <input
                            type="number"
                            id="pointsObtenus"
                            name="pointsObtenus"
                            min="0"
                            value={formData.pointsObtenus}
                            onChange={handleChange}
                            className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${errors.pointsObtenus ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.pointsObtenus && (
                            <p className="mt-1 text-sm text-red-600">{errors.pointsObtenus}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
    );
};

export default AddScoreModal;