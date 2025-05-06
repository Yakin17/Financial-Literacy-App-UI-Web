import React from 'react';

function ArticleCard({ article, onClick }) {
    return (
        <div
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                    {article.titre}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {article.contenu.substring(0, 150)}...
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Par {article.auteur.prenom} {article.auteur.nom}
                    </div>

                    <div className="text-sm text-blue-600">
                        {new Date(article.datePublication).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;