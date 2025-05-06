import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import articlesData from '../data/articlesData';

function ArticleDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState(null);

    useEffect(() => {
        const articleId = parseInt(id);
        const foundArticle = articlesData.find(art => art.id === articleId);
        setArticle(foundArticle);
    }, [id]);

    const navigateToArticles = () => {
        navigate('/articles');
    };

    const startQuiz = () => {
        setShowQuiz(true);
        setSelectedAnswers({});
        setQuizResults(null);
    };

    const handleAnswerSelect = (quizId, answerContent) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [quizId]: answerContent
        });
    };

    const submitQuiz = () => {
        if (!article) return;

        const results = {
            correct: 0,
            total: article.quizzes.length,
            details: []
        };

        article.quizzes.forEach(quiz => {
            const isCorrect = selectedAnswers[quiz.id] === quiz.reponseCorrecte;
            results.details.push({
                question: quiz.question,
                userAnswer: selectedAnswers[quiz.id] || "Non répondu",
                correctAnswer: quiz.reponseCorrecte,
                isCorrect
            });
            if (isCorrect) results.correct += 1;
        });

        setQuizResults(results);
    };

    if (!article) return <div className="max-w-4xl mx-auto py-12 px-4">Chargement de l'article...</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <button onClick={navigateToArticles}
                className="flex items-center text-blue-600 mb-6 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux articles
            </button>

            <article className="bg-white shadow rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {article.titre}
                </h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Par {article.auteur.prenom} {article.auteur.nom} • {new Date(article.datePublication).toLocaleDateString()}</span>
                </div>

                <div className="mt-6 prose prose-blue prose-lg">
                    {article.contenu.split('.').map((paragraph, idx) =>
                        paragraph.trim() && <p key={idx}>{paragraph.trim()}.</p>
                    )}
                </div>

                {!showQuiz && !quizResults && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Testez vos connaissances
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Répondez au quiz pour valider votre compréhension de cet article.
                        </p>
                        <button
                            onClick={startQuiz}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Commencer le quiz
                        </button>
                    </div>
                )}

                {showQuiz && !quizResults && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Quiz
                        </h3>
                        {article.quizzes.map(quiz => (
                            <QuizQuestion
                                key={quiz.id}
                                quiz={quiz}
                                selectedAnswer={selectedAnswers[quiz.id]}
                                onSelectAnswer={(answer) => handleAnswerSelect(quiz.id, answer)}
                            />
                        ))}

                        <button
                            onClick={submitQuiz}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Soumettre mes réponses
                        </button>
                    </div>
                )}

                {quizResults && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Résultats du Quiz
                        </h3>
                        <p className="mt-2 text-lg">
                            Score: <span className="font-bold">{quizResults.correct}</span> / {quizResults.total}
                        </p>

                        <div className="mt-4 space-y-4">
                            {quizResults.details.map((detail, idx) => (
                                <div key={idx}>
                                    <p className="font-medium">{detail.question}</p>
                                    <p className="mt-1">
                                        Votre réponse: <span className={detail.isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                            {detail.userAnswer}
                                        </span>
                                    </p>
                                    {!detail.isCorrect && (
                                        <p className="mt-1">Réponse correcte: <span className="text-green-600 font-medium">{detail.correctAnswer}</span></p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => { setShowQuiz(false); setQuizResults(null); }}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Revenir à l'article
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
}

export default ArticleDetailPage;