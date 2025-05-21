import React, { useState } from 'react';

function AddQuizModal({ articles, onClose, onSave }) {
    const [formData, setFormData] = useState({
        articleId: '',
        question: '',
        reponseCorrecte: '',
        reponseInc1: '',
        reponseInc2: '',
        reponseInc3: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Réinitialiser l'erreur pour ce champ si l'utilisateur le modifie
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validation des champs obligatoires
        if (!formData.articleId) newErrors.articleId = "Veuillez sélectionner un article";
        if (!formData.question.trim()) newErrors.question = "La question est requise";
        if (!formData.reponseCorrecte.trim()) newErrors.reponseCorrecte = "La réponse correcte est requise";
        if (!formData.reponseInc1.trim()) newErrors.reponseInc1 = "La réponse incorrecte 1 est requise";
        if (!formData.reponseInc2.trim()) newErrors.reponseInc2 = "La réponse incorrecte 2 est requise";
        if (!formData.reponseInc3.trim()) newErrors.reponseInc3 = "La réponse incorrecte 3 est requise";

        // Validation des réponses uniques
        const responses = [
            formData.reponseCorrecte.trim().toLowerCase(),
            formData.reponseInc1.trim().toLowerCase(),
            formData.reponseInc2.trim().toLowerCase(),
            formData.reponseInc3.trim().toLowerCase()
        ];

        const uniqueResponses = new Set(responses);
        if (uniqueResponses.size !== responses.length) {
            newErrors.uniqueResponses = "Toutes les réponses doivent être différentes";
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
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Ajouter un nouveau quiz</h2>
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
                        <label htmlFor="articleId" className="block text-sm font-medium text-gray-700">Article associé</label>
                        <select
                            id="articleId"
                            name="articleId"
                            value={formData.articleId}
                            onChange={handleChange}
                            className={`mt-1 block w-full py-2 px-3 border ${errors.articleId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        >
                            <option value="">Sélectionner un article</option>
                            {articles && articles.map(article => (
                                <option key={article.id} value={article.id}>
                                    {article.titre} (ID: {article.id})
                                </option>
                            ))}
                        </select>
                        {errors.articleId && <p className="mt-1 text-sm text-red-500">{errors.articleId}</p>}
                    </div>

                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                        <textarea
                            id="question"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Entrez la question du quiz..."
                            className={`mt-1 block w-full py-2 px-3 border ${errors.question ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        ></textarea>
                        {errors.question && <p className="mt-1 text-sm text-red-500">{errors.question}</p>}
                    </div>

                    <div>
                        <label htmlFor="reponseCorrecte" className="block text-sm font-medium text-green-600">Réponse correcte</label>
                        <input
                            type="text"
                            id="reponseCorrecte"
                            name="reponseCorrecte"
                            value={formData.reponseCorrecte}
                            onChange={handleChange}
                            placeholder="Entrez la réponse correcte..."
                            className={`mt-1 block w-full py-2 px-3 border ${errors.reponseCorrecte ? 'border-red-500' : 'border-green-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                        />
                        {errors.reponseCorrecte && <p className="mt-1 text-sm text-red-500">{errors.reponseCorrecte}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="reponseInc1" className="block text-sm font-medium text-red-600">Réponse incorrecte 1</label>
                            <input
                                type="text"
                                id="reponseInc1"
                                name="reponseInc1"
                                value={formData.reponseInc1}
                                onChange={handleChange}
                                placeholder="Option incorrecte 1..."
                                className={`mt-1 block w-full py-2 px-3 border ${errors.reponseInc1 ? 'border-red-500' : 'border-red-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                            />
                            {errors.reponseInc1 && <p className="mt-1 text-sm text-red-500">{errors.reponseInc1}</p>}
                        </div>

                        <div>
                            <label htmlFor="reponseInc2" className="block text-sm font-medium text-red-600">Réponse incorrecte 2</label>
                            <input
                                type="text"
                                id="reponseInc2"
                                name="reponseInc2"
                                value={formData.reponseInc2}
                                onChange={handleChange}
                                placeholder="Option incorrecte 2..."
                                className={`mt-1 block w-full py-2 px-3 border ${errors.reponseInc2 ? 'border-red-500' : 'border-red-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                            />
                            {errors.reponseInc2 && <p className="mt-1 text-sm text-red-500">{errors.reponseInc2}</p>}
                        </div>

                        <div>
                            <label htmlFor="reponseInc3" className="block text-sm font-medium text-red-600">Réponse incorrecte 3</label>
                            <input
                                type="text"
                                id="reponseInc3"
                                name="reponseInc3"
                                value={formData.reponseInc3}
                                onChange={handleChange}
                                placeholder="Option incorrecte 3..."
                                className={`mt-1 block w-full py-2 px-3 border ${errors.reponseInc3 ? 'border-red-500' : 'border-red-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                            />
                            {errors.reponseInc3 && <p className="mt-1 text-sm text-red-500">{errors.reponseInc3}</p>}
                        </div>
                    </div>

                    {errors.uniqueResponses && (
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{errors.uniqueResponses}</span>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddQuizModal;