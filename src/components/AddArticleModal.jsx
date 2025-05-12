import React, { useState, useEffect } from 'react';
import { utilisateurService } from '../services/apiService'; 

const AddArticleModal = ({ onClose, onSave }) => {
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [auteurId, setAuteurId] = useState('');
    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAuteurs = async () => { 
            try {
                const response = await utilisateurService.getAll();
                setAuteurs(response.data);
                if (response.data.length > 0) {
                    setAuteurId(response.data[0].id);
                }
                setLoading(false);

            } catch (error) {
                console.error("Erreur lors de la récupération des auteurs", error);
                setLoading(false);
            }
        };
        fetchAuteurs();

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const articleData = {
            titre,
            contenu,
            auteurId: parseInt(auteurId)
        };

        onSave(articleData);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un article</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
                                Titre
                            </label>
                            <input
                                type="text"
                                id="titre"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="auteur">
                                Auteur
                            </label>
                            <select
                                id="auteur"
                                value={auteurId}
                                onChange={(e) => setAuteurId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                {auteurs.map(auteur => (
                                    <option key={auteur.id} value={auteur.id}>
                                        {auteur.nom} ({auteur.username})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contenu">
                                Contenu
                            </label>
                            <textarea
                                id="contenu"
                                value={contenu}
                                onChange={(e) => setContenu(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddArticleModal