import React, { useState, useEffect, useContext } from 'react';
import SearchBar from './ui/SearchBar';
import { articleService } from '../services/apiService';
import { AuthContext } from '../contexts/AuthContext';
import DeleteConfirmModal from './DeleteConfirmModal';
import ArticleDetails from './ArticleDetails'; // Import missing ArticleDetails component
import AddArticleModal from './AddArticleModal'; // Import missing AddArticleModal component
import EditArticleModal from './EditArticleModal'; // Import missing EditArticleModal component

const ArticleManagement = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showArticleDetails, setShowArticleDetails] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getToken, currentUser } = useContext(AuthContext);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await articleService.getAll();
            setArticles(response.data);
            setFilteredArticles(response.data);
            setError(null);

        } catch (err) {
            console.error("Erreur lors de la récupération des articles", err);
            setError("Impossible de charger les articles. Veuillez réessayer.");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (getToken()) {
            fetchArticles();
        }
    }, [getToken]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = articles.filter(
                article =>
                    article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    article.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    article.auteurNom.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    }, [searchTerm, articles]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const viewArticleDetails = (article) => {
        setSelectedArticle(article);
        setShowArticleDetails(true);
    };

    const closeArticleDetails = () => {
        setShowArticleDetails(false);
        setSelectedArticle(null);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const openEditModal = (article) => {
        setSelectedArticle(article);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedArticle(null);
    };

    const openDeleteModal = (article) => {
        setSelectedArticle(article);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedArticle(null);
    };

    const handleAddArticle = async (articleData) => {
        try {
            await articleService.create(articleData);
            fetchArticles();
            closeAddModal();
        } catch (err) {
            console.error("Erreur lors de la création de l'article", err);
            alert("Une erreur s'est produite lors de la création de l'article");
        }
    };

    const handleEditArticle = async (articleData) => {
        try {
            await articleService.update(selectedArticle.id, articleData);
            fetchArticles();
            closeEditModal();
        } catch (err) {
            console.error("Erreur lors de la modification de l'article", err);
            alert("Une erreur s'est produite lors de la modification de l'article");
        }
    };

    const handleDeleteArticle = async () => {
        try {
            await articleService.delete(selectedArticle.id);
            fetchArticles();
            closeDeleteModal();
        } catch (err) {
            console.error("Erreur lors de la suppression de l'article", err);
            alert("Une erreur s'est produite lors de la suppression de l'article");
        }
    };

    const truncateText = (text, maxLength = 100) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
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
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Articles</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Ajouter un article
                </button>
            </div>

            <SearchBar
                placeholder="Rechercher un article..."
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
                                    Titre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aperçu du contenu
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Auteur
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date de publication
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article) => (
                                    <tr key={article.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {article.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{article.titre}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 line-clamp-2">{truncateText(article.contenu)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{article.auteurNom}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(article.datePublication)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => viewArticleDetails(article)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => openEditModal(article)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Éditer
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(article)}
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
                                        Aucun article trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal pour afficher les détails de l'article */}
            {showArticleDetails && selectedArticle && (
                <ArticleDetails
                    article={selectedArticle}
                    onClose={closeArticleDetails}
                    onEdit={() => {
                        closeArticleDetails();
                        openEditModal(selectedArticle);
                    }}
                    onDelete={() => {
                        closeArticleDetails();
                        openDeleteModal(selectedArticle);
                    }}
                />
            )}

            {/* Modal pour ajouter un article */}
            {showAddModal && (
                <AddArticleModal
                    onClose={closeAddModal}
                    onSave={handleAddArticle}
                />
            )}

            {/* Modal pour modifier un article */}
            {showEditModal && selectedArticle && (
                <EditArticleModal
                    article={selectedArticle}
                    onClose={closeEditModal}
                    onSave={handleEditArticle}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && selectedArticle && (
                <DeleteConfirmModal
                    item={selectedArticle}
                    itemType="article"
                    onClose={closeDeleteModal}
                    onConfirm={handleDeleteArticle}
                />
            )}
        </div>

    );
}

export default ArticleManagement