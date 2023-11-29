// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading) {
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
    if (user && isAdmin) {
        return children;
    }
    
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>;
};

export default AdminRoute;