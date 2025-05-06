import React from 'react';

function QuizQuestion({ quiz, selectedAnswer, onSelectAnswer }) {
    return (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">
                {quiz.question}
            </p>
            <div className="mt-3 space-y-2">
                {quiz.reponses.map(reponse => (
                    <div
                        key={reponse.id}
                        className="flex items-center"
                    >
                        <input
                            type="radio"
                            id={`reponse-${reponse.id}`}
                            name={`quiz-${quiz.id}`}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            checked={selectedAnswer === reponse.contenu}
                            onChange={() => onSelectAnswer(reponse.contenu)}
                        />
                        <label
                            htmlFor={`reponse-${reponse.id}`}
                            className="ml-3 block text-sm text-gray-700"
                        >
                            {reponse.contenu}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizQuestion;