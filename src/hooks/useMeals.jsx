// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMeals = () => {
    const axiosPublic = useAxiosPublic();
    
   const {data: meals = [], refetch} = useQuery({
    queryKey : ['meals'],
    queryFn: async() =>{
        const res = await axiosPublic.get('/meals')
        return res.data;
    }
   });
   return [meals, refetch];
}
export default useMeals;