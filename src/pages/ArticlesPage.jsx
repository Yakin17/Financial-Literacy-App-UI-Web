import React from 'react';
import ArticleCard from '../components/ArticleCard';
import articlesData from '../data/articlesData'; 
import { useNavigate } from 'react-router';
function ArticlesPage() {
    const navigate = useNavigate();

    const viewArticle = (article) => {
        navigate(`/articledetail/${article.id}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                Articles financiers
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articlesData.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => viewArticle(article)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ArticlesPage;