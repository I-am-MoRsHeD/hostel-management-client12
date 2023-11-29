// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://hostel-management-server12.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;