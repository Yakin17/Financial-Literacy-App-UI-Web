import React, { useState, useEffect } from 'react';
import SearchBar from './ui/SearchBar';
import { scoreService, utilisateurService, quizService } from '../services/apiService';
import DeleteConfirmModal from './DeleteConfirmModal';
import ScoreDetails from './ScoreDetails';
import AddScoreModal from './AddScoreModal';
import EditScoreModal from './EditScoreModal';

const ScoreManagement = () => {
    const [scores, setScores] = useState([]);
    const [filteredScores, setFilteredScores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedScore, setSelectedScore] = useState(null);
    const [showScoreDetails, setShowScoreDetails] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    // Fonction pour obtenir le nom de l'utilisateur à partir de son ID
    const getUserName = (utilisateurId) => {
        const utilisateur = utilisateurs.find(u => u.id == utilisateurId);
        return utilisateur ? `${utilisateur.nom} ${utilisateur.prenom || ''}` : `Utilisateur ID: ${utilisateurId}`;
    };

    // Fonction pour obtenir la question du quiz à partir de son ID
    const getQuizQuestion = (quizId) => {
        const quiz = quizzes.find(q => q.id == quizId);
        return quiz ? quiz.question : `Quiz ID: ${quizId}`;
    };

    const fetchScores = async () => {
        try {
            setLoading(true);
            const response = await scoreService.getAll();
            setScores(response.data);
            setFilteredScores(response.data);
            setError(null);
        } catch (err) {
            console.error("Erreur lors de la récupération des scores", err);
            setError("Impossible de charger les scores. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUtilisateurs = async () => {
        try {
            const response = await utilisateurService.getAll();
            setUtilisateurs(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des utilisateurs", err);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const response = await quizService.getAll();
            setQuizzes(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des quiz", err);
        }
    };

    useEffect(() => {
        fetchScores();
        fetchUtilisateurs();
        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = scores.filter(
                score =>
                    getUserName(score.utilisateurId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    getQuizQuestion(score.quizId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    score.pointsObtenus.toString().includes(searchTerm)
            );
            setFilteredScores(filtered);
        } else {
            setFilteredScores(scores);
        }
    }, [searchTerm, scores, utilisateurs, quizzes]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const viewScoreDetails = (score) => {
        setSelectedScore(score);
        setShowScoreDetails(true);
    };

    const closeScoreDetails = () => {
        setShowScoreDetails(false);
        setSelectedScore(null);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const openEditModal = (score) => {
        setSelectedScore(score);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedScore(null);
    };

    const openDeleteModal = (score) => {
        setSelectedScore(score);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedScore(null);
    };

    const handleAddScore = async (scoreData) => {
        try {
            // Assurez-vous que utilisateurId et quizId sont des nombres
            const formattedData = {
                ...scoreData,
                utilisateurId: Number(scoreData.utilisateurId),
                quizId: Number(scoreData.quizId),
                pointsObtenus: Number(scoreData.pointsObtenus)
            };

            await scoreService.create(formattedData);
            fetchScores();
            closeAddModal();
        } catch (err) {
            console.error("Erreur lors de la création du score", err);
            alert("Une erreur s'est produite lors de la création du score");
        }
    };

    const handleEditScore = async (scoreData) => {
        try {
            // Assurez-vous que utilisateurId et quizId sont des nombres
            const formattedData = {
                ...scoreData,
                utilisateurId: Number(scoreData.utilisateurId),
                quizId: Number(scoreData.quizId),
                pointsObtenus: Number(scoreData.pointsObtenus)
            };

            await scoreService.update(selectedScore.id, formattedData);
            fetchScores();
            closeEditModal();
        } catch (err) {
            console.error("Erreur lors de la modification du score", err);
            alert("Une erreur s'est produite lors de la modification du score");
        }
    };

    const handleDeleteScore = async () => {
        try {
            await scoreService.delete(selectedScore.id);
            fetchScores();
            closeDeleteModal();
        } catch (err) {
            console.error("Erreur lors de la suppression du score", err);
            alert("Une erreur s'est produite lors de la suppression du score");
        }
    };

    // Formater la date pour l'affichage
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Scores</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Ajouter un score
                </button>
            </div>

            <SearchBar
                placeholder="Rechercher un score..."
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
                                    Utilisateur
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quiz
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Points
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredScores.length > 0 ? (
                                filteredScores.map((score) => (
                                    <tr key={score.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {score.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{getUserName(score.utilisateurId)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 line-clamp-2">{getQuizQuestion(score.quizId)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{score.pointsObtenus}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(score.datePassage)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewScoreDetails(score)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => openEditModal(score)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Éditer
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(score)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Aucun score trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal pour afficher les détails du score */}
            {showScoreDetails && selectedScore && (
                <ScoreDetails
                    score={selectedScore}
                    utilisateurName={getUserName(selectedScore.utilisateurId)}
                    quizQuestion={getQuizQuestion(selectedScore.quizId)}
                    onClose={closeScoreDetails}
                    onEdit={() => {
                        closeScoreDetails();
                        openEditModal(selectedScore);
                    }}
                    onDelete={() => {
                        closeScoreDetails();
                        openDeleteModal(selectedScore);
                    }}
                />
            )}

            {/* Modal pour ajouter un score */}
            {showAddModal && (
                <AddScoreModal
                    utilisateurs={utilisateurs}
                    quizzes={quizzes}
                    onClose={closeAddModal}
                    onSave={handleAddScore}
                />
            )}

            {/* Modal pour modifier un score */}
            {showEditModal && selectedScore && (
                <EditScoreModal
                    score={selectedScore}
                    utilisateurs={utilisateurs}
                    quizzes={quizzes}
                    onClose={closeEditModal}
                    onSave={handleEditScore}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && selectedScore && (
                <DeleteConfirmModal
                    item={selectedScore}
                    itemType="score"
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteScore}
                />
            )}
        </div>
    );
};

export default ScoreManagement;