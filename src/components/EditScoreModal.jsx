import React, { useState, useEffect } from 'react';

const EditScoreModal = ({ score, utilisateurs, quizzes, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        utilisateurId: '',
        quizId: '',
        pointsObtenus: '',
        datePassage: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (score) {
            setFormData({
                id: score.id || '',
                utilisateurId: score.utilisateurId || '',
                quizId: score.quizId || '',
                pointsObtenus: score.pointsObtenus || '',
                datePassage: score.datePassage ? new Date(score.datePassage).toISOString().slice(0, 16) : ''
            });
        }
    }, [score]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.utilisateurId) newErrors.utilisateurId = "L'utilisateur est requis";
        if (!formData.quizId) newErrors.quizId = "Le quiz est requis";
        if (!formData.pointsObtenus) newErrors.pointsObtenus = "Les points sont requis";
        else if (isNaN(formData.pointsObtenus) || formData.pointsObtenus < 0) {
            newErrors.pointsObtenus = "Les points doivent être un nombre positif";
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Modifier un score</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utilisateurId">
                            Utilisateur
                        </label>
                        <select
                            id="utilisateurId"
                            name="utilisateurId"
                            value={formData.utilisateurId}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.utilisateurId ? 'border-red-500' : ''
                                }`}
                        >
                            <option value="">Sélectionner un utilisateur</option>
                            {utilisateurs.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.nom} {user.prenom || ''} ({user.email})
                                </option>
                            ))}
                        </select>
                        {errors.utilisateurId && <p className="text-red-500 text-xs italic">{errors.utilisateurId}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quizId">
                            Quiz
                        </label>
                        <select
                            id="quizId"
                            name="quizId"
                            value={formData.quizId}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.quizId ? 'border-red-500' : ''
                                }`}
                        >
                            <option value="">Sélectionner un quiz</option>
                            {quizzes.map(quiz => (
                                <option key={quiz.id} value={quiz.id}>
                                    {quiz.question}
                                </option>
                            ))}
                        </select>
                        {errors.quizId && <p className="text-red-500 text-xs italic">{errors.quizId}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pointsObtenus">
                            Points obtenus
                        </label>
                        <input
                            id="pointsObtenus"
                            name="pointsObtenus"
                            type="number"
                            min="0"
                            value={formData.pointsObtenus}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pointsObtenus ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.pointsObtenus && <p className="text-red-500 text-xs italic">{errors.pointsObtenus}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datePassage">
                            Date de passage
                        </label>
                        <input
                            id="datePassage"
                            name="datePassage"
                            type="datetime-local"
                            value={formData.datePassage}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <p className="text-gray-500 text-xs mt-1">Laisser vide pour utiliser la date actuelle</p>
                    </div>

                    <div className="flex items-center justify-end p-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditScoreModal;