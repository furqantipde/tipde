import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = () => {
        return firebaseSignOut(auth);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return { data: result, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
