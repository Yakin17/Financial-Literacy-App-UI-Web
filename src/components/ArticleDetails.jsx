import React from 'react'

const ArticleDetails = ({ article, onClose, onEdit, onDelete }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-hidden">
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{article.titre}</h2>

                    <div className="mb-4 bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-500">Auteur: {article.auteurNom}</span>
                        <span className="text-sm text-gray-500 ml-4">Publié le: {new Date(article.datePublication).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Contenu</h3>
                        <div className="bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap">
                            {article.contenu}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 px-6 py-3 flex justify-end space-x-2">
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Éditer
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetails
