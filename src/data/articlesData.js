const articlesData = [
    {
        id: 1,
        titre: "Les bases de l'investissement",
        contenu: "L'investissement est une stratégie financière qui consiste à allouer des ressources dans l'espoir d'en tirer un bénéfice futur. Il existe plusieurs types d'investissements comme les actions, les obligations, l'immobilier et les matières premières. Chaque type d'investissement comporte ses propres risques et avantages. Il est important de diversifier son portefeuille pour réduire les risques et maximiser les rendements potentiels. Avant d'investir, il est recommandé de définir ses objectifs financiers et de comprendre sa tolérance au risque.",
        datePublication: "2025-05-01T10:30:00",
        auteur: { id: 1, nom: "Dubois", prenom: "Marie" },
        quizzes: [
            {
                id: 1,
                question: "Quel est l'avantage principal de la diversification d'un portefeuille d'investissement?",
                reponseCorrecte: "Réduire les risques",
                reponses: [
                    { id: 1, contenu: "Réduire les risques" },
                    { id: 2, contenu: "Augmenter les frais" },
                    { id: 3, contenu: "Complexifier la gestion" },
                    { id: 4, contenu: "Limiter les gains potentiels" }
                ]
            }
        ]
    },
    {
        id: 2,
        titre: "Comprendre les marchés boursiers",
        contenu: "Les marchés boursiers sont des plateformes où s'échangent des titres financiers comme les actions et les obligations. Ils jouent un rôle crucial dans l'économie mondiale en permettant aux entreprises de lever des capitaux et aux investisseurs de participer à la croissance économique. Les indices boursiers, comme le CAC 40 ou le S&P 500, sont des indicateurs qui reflètent la performance d'un ensemble d'actions. Les facteurs qui influencent les marchés sont nombreux : résultats des entreprises, données économiques, politiques monétaires, événements géopolitiques, etc.",
        datePublication: "2025-05-02T14:45:00",
        auteur: { id: 2, nom: "Martin", prenom: "Thomas" },
        quizzes: [
            {
                id: 2,
                question: "Quelle est la fonction principale des marchés boursiers?",
                reponseCorrecte: "Permettre aux entreprises de lever des capitaux",
                reponses: [
                    { id: 5, contenu: "Établir les taux d'intérêt" },
                    { id: 6, contenu: "Permettre aux entreprises de lever des capitaux" },
                    { id: 7, contenu: "Fixer les prix des matières premières" },
                    { id: 8, contenu: "Déterminer les politiques monétaires" }
                ]
            }
        ]
    },
    {
        id: 3,
        titre: "La planification de la retraite",
        contenu: "La planification de la retraite est un processus qui consiste à définir ses objectifs financiers pour la retraite et à mettre en place des stratégies pour les atteindre. Il est recommandé de commencer à épargner tôt pour bénéficier des effets de l'intérêt composé. Les véhicules d'épargne-retraite comme le PER, l'assurance-vie ou les SCPI offrent des avantages fiscaux qui peuvent optimiser votre stratégie. Une bonne planification de la retraite prend en compte l'inflation, l'espérance de vie et les besoins financiers futurs.",
        datePublication: "2025-05-03T09:15:00",
        auteur: { id: 3, nom: "Leroy", prenom: "Sophie" },
        quizzes: [
            {
                id: 3,
                question: "Pourquoi est-il avantageux de commencer à épargner tôt pour la retraite?",
                reponseCorrecte: "Pour bénéficier de l'intérêt composé sur une plus longue période",
                reponses: [
                    { id: 9, contenu: "Pour payer moins d'impôts" },
                    { id: 10, contenu: "Pour bénéficier de l'intérêt composé sur une plus longue période" },
                    { id: 11, contenu: "Pour éviter l'inflation" },
                    { id: 12, contenu: "Pour accéder à des produits financiers exclusifs" }
                ]
            }
        ]
    }
]

export default articlesData;
