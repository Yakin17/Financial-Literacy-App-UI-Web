import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté au chargement de l'application
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && token) {
            setCurrentUser({...user, token});
        }
        setLoading(false);
    }, []);

    const login = (userData) => {

        localStorage.setItem('token', userData.token);
        const userInfo = {
            id: userData.id,
            username: userData.username,
            nom: userData.nom,
            email: userData.email,
            role: userData.role
        };

        // Stocker les informations utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));
        setCurrentUser({...userInfo, token: userData.token});
    };

    const logout = () => {
        // Supprimer les informations utilisateur de localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const isAuthenticated = () => {
        return !!currentUser;
    };

    const isAdmin = () => {
        return currentUser && currentUser.role === 'ROLE_ADMIN';
    };

    const hasRole = (role) => {
        return currentUser && currentUser.role === role;
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const getUsername = () => {
        return currentUser ? currentUser.username : null;
    };

    const value = {
        currentUser,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        hasRole,
        getToken,
        getUsername,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};