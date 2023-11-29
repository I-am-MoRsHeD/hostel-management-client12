// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
   

    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log("useAdmin console",res.data)
            return res.data.admin
        }
    })
    return [isAdmin, isAdminLoading];
};

export default useAdmin;