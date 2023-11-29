// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../hooks/useAuth';
import { BallTriangle } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (user) {
        return children;
    }
    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    }
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>;
};

export default PrivateRoute;