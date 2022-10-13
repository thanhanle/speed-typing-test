import React, { createContext, useContext, useState, useEffect } from 'react'
import { firebaseAuthentication } from '../firebase'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return firebaseAuthentication.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return firebaseAuthentication.signInWithEmailAndPassword(email, password)
    }
    
    function logout() {
        return firebaseAuthentication.signOut()
    }

    // function resetPassword(email) {
    //     return firebaseMethods.sendPasswordResetEmail(email)
    // }
    
    // function updateEmail(email) {
    //     return currentUser.updateEmail(email)
    // }
    
    // function updatePassword(password) {
    //     return currentUser.updatePassword(password)
    // }

    useEffect(() => {
        const unsubscribe = firebaseAuthentication.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        //resetPassword,
        //updateEmail,
        //updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}