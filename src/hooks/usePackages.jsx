// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePackages = () => {
    const axiosSecure = useAxiosSecure();

    const { data: packages = [] } = useQuery({
        queryKey: ['package'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages')
            return res.data;
        }
    })

    return [packages];
};

export default usePackages;