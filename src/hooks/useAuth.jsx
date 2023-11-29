// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useAuth = () => {
    const Auth = useContext(AuthContext);
    return Auth;
};

export default useAuth;