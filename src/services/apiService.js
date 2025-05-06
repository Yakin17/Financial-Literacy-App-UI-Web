import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const utilisateurService = {
    getAll: () => api.get('/utilisateurs'),
    getById: (id) => api.get(`/utilisateurs/${id}`),
    create: (userData) => api.post('/utilisateurs', userData),
    update: (id, userData) => api.put(`/utilisateurs/${id}`, userData),
    delete: (id) => api.delete(`/utilisateurs/${id}`)
};


const articleService = {
    getAll: () => api.get('/articles'),
    getById: (id) => api.get(`/articles/${id}`),
    getByAuteur: (auteurId) => api.get(`/articles/auteur/${auteurId}`),
    create: (articleData) => api.post('/articles', articleData),
    update: (id, articleData) => api.put(`/articles/${id}`, articleData),
    delete: (id) => api.delete(`/articles/${id}`)
};


const quizService = {
    getAll: () => api.get('/quiz'),
    getById: (id) => api.get(`/quiz/${id}`),
    getByArticle: (articleId) => api.get(`/quiz/article/${articleId}`),
    create: (quizData) => api.post('/quiz', quizData),
    update: (id, quizData) => api.put(`/quiz/${id}`, quizData),
    delete: (id) => api.delete(`/quiz/${id}`)
};

const scoreService = {
    getAll: () => api.get('/scores'),
    getById: (id) => api.get(`/scores/${id}`),
    getByUtilisateur: (utilisateurId) => api.get(`/scores/utilisateur/${utilisateurId}`),
    getByQuiz: (quizId) => api.get(`/scores/quiz/${quizId}`),
    create: (scoreData) => api.post('/scores', scoreData),
    update: (id, scoreData) => api.put(`/scores/${id}`, scoreData),
    delete: (id) => api.delete(`/scores/${id}`)
};

const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/utilisateurs', userData),
    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        // Décoder le JWT pour obtenir les informations utilisateur
        try {
            // Note: ceci est simplifié, vous pourriez vouloir utiliser une bibliothèque comme jwt-decode
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

export {
    utilisateurService,
    articleService,
    quizService,
    scoreService,
    authService
};
