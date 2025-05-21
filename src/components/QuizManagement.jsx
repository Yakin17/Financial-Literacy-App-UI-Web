import React, { useState, useEffect } from 'react';

import SearchBar from './ui/SearchBar';
import { quizService, articleService } from '../services/apiService';
import DeleteConfirmModal from './DeleteConfirmModal';
import QuizDetails from './QuizDetails';
import AddQuizModal from './AddQuizModal';
import EditQuizModal from './EditQuizModal';

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showQuizDetails, setShowQuizDetails] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]); // Pour stocker les articles pour les dropdowns

    // Fonction pour obtenir le titre de l'article à partir de son ID
    const getArticleTitle = (articleId) => {
        const article = articles.find(a => a.id == articleId);
        return article ? article.titre : `Article ID: ${articleId}`;
    };

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const response = await quizService.getAll();
            setQuizzes(response.data);
            setFilteredQuizzes(response.data);
            setError(null);
        } catch (err) {
            console.error("Erreur lors de la récupération des quiz", err);
            setError("Impossible de charger les quiz. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const fetchArticles = async () => {
        try {
            const response = await articleService.getAll();
            setArticles(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des articles", err);
        }
    };

    useEffect(() => {
        fetchQuizzes();
        fetchArticles();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = quizzes.filter(
                quiz =>
                    quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    quiz.reponseCorrecte.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    quiz.reponseInc1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    quiz.reponseInc2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    quiz.reponseInc3.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQuizzes(filtered);
        } else {
            setFilteredQuizzes(quizzes);
        }
    }, [searchTerm, quizzes]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const viewQuizDetails = (quiz) => {
        setSelectedQuiz(quiz);
        setShowQuizDetails(true);
    };

    const closeQuizDetails = () => {
        setShowQuizDetails(false);
        setSelectedQuiz(null);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const openEditModal = (quiz) => {
        setSelectedQuiz(quiz);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedQuiz(null);
    };

    const openDeleteModal = (quiz) => {
        setSelectedQuiz(quiz);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedQuiz(null);
    };

    const handleAddQuiz = async (quizData) => {
        try {
            // Assurez-vous que articleId est un nombre
            const formattedData = {
                ...quizData,
                articleId: Number(quizData.articleId)
            };

            await quizService.create(formattedData);
            fetchQuizzes();
            closeAddModal();
        } catch (err) {
            console.error("Erreur lors de la création du quiz", err);
            alert("Une erreur s'est produite lors de la création du quiz");
        }
    };

    const handleEditQuiz = async (quizData) => {
        try {
            // Assurez-vous que articleId est un nombre
            const formattedData = {
                ...quizData,
                articleId: Number(quizData.articleId)
            };

            await quizService.update(selectedQuiz.id, formattedData);
            fetchQuizzes();
            closeEditModal();
        } catch (err) {
            console.error("Erreur lors de la modification du quiz", err);
            alert("Une erreur s'est produite lors de la modification du quiz");
        }
    };

    const handleDeleteQuiz = async () => {
        try {
            await quizService.delete(selectedQuiz.id);
            fetchQuizzes();
            closeDeleteModal();
        } catch (err) {
            console.error("Erreur lors de la suppression du quiz", err);
            alert("Une erreur s'est produite lors de la suppression du quiz");
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
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Quiz</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Ajouter un quiz
                </button>
            </div>

            <SearchBar
                placeholder="Rechercher un quiz..."
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
                                    Question
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Réponse correcte
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Article associé
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {quiz.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 line-clamp-2">{quiz.question}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 line-clamp-2">{quiz.reponseCorrecte}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{getArticleTitle(quiz.articleId)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewQuizDetails(quiz)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => openEditModal(quiz)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Éditer
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(quiz)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Aucun quiz trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal pour afficher les détails du quiz */}
            {showQuizDetails && selectedQuiz && (
                <QuizDetails
                    quiz={selectedQuiz}
                    articleTitle={getArticleTitle(selectedQuiz.articleId)}
                    onClose={closeQuizDetails}
                    onEdit={() => {
                        closeQuizDetails();
                        openEditModal(selectedQuiz);
                    }}
                    onDelete={() => {
                        closeQuizDetails();
                        openDeleteModal(selectedQuiz);
                    }}
                />
            )}

            {/* Modal pour ajouter un quiz */}
            {showAddModal && (
                <AddQuizModal
                    articles={articles}
                    onClose={closeAddModal}
                    onSave={handleAddQuiz}
                />
            )}

            {/* Modal pour modifier un quiz */}
            {showEditModal && selectedQuiz && (
                <EditQuizModal
                    quiz={selectedQuiz}
                    articles={articles}
                    onClose={closeEditModal}
                    onSave={handleEditQuiz}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && selectedQuiz && (
                <DeleteConfirmModal
                    item={selectedQuiz}
                    itemType="quiz"
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteQuiz}
                />
            )}
        </div>
    );
};

export default QuizManagement;