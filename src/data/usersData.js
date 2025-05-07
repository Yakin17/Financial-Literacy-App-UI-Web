// Données utilisateurs fictives
export const usersData = [
    {
        id: 1,
        nom: "Admin Principal",
        username: "admin",
        email: "admin@financialliteracy.com",
        motDePasse: "$2a$10$X5mI7cGafwDO6bF5D2j05eBvxUMsGo5MuGTCMDSGQwUkj2uNtJARq", // hashé
        role: "ROLE_ADMIN",
        dateCreation: "2023-11-10T08:00:00.000Z",
        articles: [1, 2],
        scores: [
            { id: 1, value: 95, quiz: "Quiz Finance Personnelle", date: "2023-11-15T14:30:00.000Z" }
        ]
    },
    {
        id: 2,
        nom: "Jean Dupont",
        username: "jean_d",
        email: "jean.dupont@example.com",
        motDePasse: "$2a$10$Xjk8i5QnzKfGO0tMDCK3g.rJd2T7.3vCnIkLJaO6uLgwdzbHMEUwu", // hashé
        role: "ROLE_USER",
        dateCreation: "2023-11-15T10:30:00.000Z",
        articles: [3],
        scores: [
            { id: 2, value: 82, quiz: "Quiz Finance Personnelle", date: "2023-11-16T09:15:00.000Z" },
            { id: 3, value: 78, quiz: "Quiz Investissement", date: "2023-11-18T14:20:00.000Z" }
        ]
    },
    {
        id: 3,
        nom: "Marie Lambert",
        username: "marie_l",
        email: "marie.lambert@example.com",
        motDePasse: "$2a$10$Gkj6nU2FUQZp4aYpk6BI8O8QlPe5QnWOJaLjY8LD.pK2JfCXnEwxm", // hashé
        role: "ROLE_USER",
        dateCreation: "2023-11-20T14:45:00.000Z",
        articles: [4],
        scores: [
            { id: 4, value: 90, quiz: "Quiz Épargne", date: "2023-11-21T16:00:00.000Z" }
        ]
    },
    {
        id: 4,
        nom: "Lucas Martin",
        username: "lucas_m",
        email: "lucas.martin@example.com",
        motDePasse: "$2a$10$HnElNbpA5D7E2o7zT4vYlOz0RbzfSX0NjH.0kYpjqJNQJz8hKO25i", // hashé
        role: "ROLE_USER",
        dateCreation: "2023-12-01T09:20:00.000Z",
        articles: [],
        scores: [
            { id: 5, value: 65, quiz: "Quiz Finance Personnelle", date: "2023-12-02T10:30:00.000Z" },
            { id: 6, value: 88, quiz: "Quiz Épargne", date: "2023-12-05T15:45:00.000Z" }
        ]
    },
    {
        id: 5,
        nom: "Sophie Dubois",
        username: "sophie_d",
        email: "sophie.dubois@example.com",
        motDePasse: "$2a$10$Y4F.2EcGDnU/eBcKnfXl4OZIeZI5oBJt1OSDnRUQGAGJXVPd3KKuq", // hashé
        role: "ROLE_USER",
        dateCreation: "2023-12-10T11:15:00.000Z",
        articles: [5],
        scores: [
            { id: 7, value: 92, quiz: "Quiz Investissement", date: "2023-12-12T13:40:00.000Z" }
        ]
    },
    {
        id: 6,
        nom: "Thomas Petit",
        username: "thomas_p",
        email: "thomas.petit@example.com",
        motDePasse: "$2a$10$XtEj2tJHzTDw5fJJkR4Piu8EH3MhJLgCBZ8tZOBMgV5CWtJ3iZ5ZK", // hashé
        role: "ROLE_ADMIN",
        dateCreation: "2023-12-15T16:30:00.000Z",
        articles: [6],
        scores: []
    }
];

// Données articles fictives
export const articlesData = [
    {
        id: 1,
        titre: "Introduction à l'éducation financière",
        contenu: "L'éducation financière est un processus par lequel les individus améliorent leur compréhension des produits et concepts financiers, développent les compétences et la confiance nécessaires pour prendre conscience des risques financiers et des opportunités...",
        auteur: 1, // ID de l'auteur
        datePublication: "2023-11-12T09:00:00.000Z",
        statut: "PUBLIÉ",
        categorie: "Bases financières"
    },
    {
        id: 2,
        titre: "Comment établir un budget efficace",
        contenu: "Établir un budget est l'une des premières étapes importantes pour prendre le contrôle de vos finances. Un budget bien planifié vous aide à suivre vos dépenses, à économiser de l'argent et à atteindre vos objectifs financiers...",
        auteur: 1, // ID de l'auteur
        datePublication: "2023-11-18T14:30:00.000Z",
        statut: "PUBLIÉ",
        categorie: "Planification financière"
    },
    {
        id: 3,
        titre: "Les bases de l'investissement pour débutants",
        contenu: "L'investissement peut sembler intimidant pour les débutants, mais c'est un moyen essentiel de faire fructifier votre argent et d'atteindre vos objectifs financiers à long terme. Dans cet article, nous allons démystifier les concepts de base de l'investissement...",
        auteur: 2, // ID de l'auteur
        datePublication: "2023-11-25T10:45:00.000Z",
        statut: "PUBLIÉ",
        categorie: "Investissement"
    },
    {
        id: 4,
        titre: "Stratégies d'épargne pour l'avenir",
        contenu: "L'épargne est un élément crucial de la santé financière. Que vous économisiez pour une urgence, un achat important ou la retraite, avoir une stratégie d'épargne solide est essentiel. Dans cet article, nous explorerons différentes méthodes d'épargne efficaces...",
        auteur: 3, // ID de l'auteur
        datePublication: "2023-12-05T16:20:00.000Z",
        statut: "PUBLIÉ",
        categorie: "Épargne"
    },
    {
        id: 5,
        titre: "Comprendre les mécanismes de la bourse",
        contenu: "La bourse est un marché où s'échangent des actions, qui représentent des parts de propriété dans des entreprises. Comprendre comment fonctionne la bourse est essentiel pour tout investisseur. Dans cet article, nous examinerons les principes fondamentaux...",
        auteur: 5, // ID de l'auteur
        datePublication: "2023-12-15T11:10:00.000Z",
        statut: "BROUILLON",
        categorie: "Investissement"
    },
    {
        id: 6,
        titre: "Gérer les dettes et améliorer son crédit",
        contenu: "La gestion des dettes est une compétence financière essentielle. Que vous ayez des prêts étudiants, une hypothèque ou des dettes de carte de crédit, il est important de comprendre comment gérer efficacement ces obligations financières...",
        auteur: 6, // ID de l'auteur
        datePublication: "2023-12-20T13:45:00.000Z",
        statut: "PUBLIÉ",
        categorie: "Gestion des dettes"
    }
];