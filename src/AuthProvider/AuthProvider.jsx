// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const [packageName, setPackageName] = useState(null);
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // google sign in
    const signWithPopup = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const signUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
            if(currentUser){
                const userInfo ={ email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            // setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signUser,
        logOut,
        setItems,
        items,
        signWithPopup,
        setPackageName,
        packageName
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;