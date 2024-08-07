// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Container from '../../../../Shared/Container';
import useMeals from '../../../../hooks/useMeals';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
    const [meals] = useMeals();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [items, setItems] = useState([]);

    const { data: currentUser = {} } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        const findItems = meals?.filter(meal => meal.email === currentUser?.email);
        setItems(findItems);
    }, [currentUser?.email, meals])

    if (currentUser?.role !== 'Admin') {
        return;
    }



    console.log(meals)


    return (
        <div className='shadow-amber-200 shadow-sm rounded-lg max-w-2xl mx-auto pt-4'>
             <Helmet>
                <title>Cooking God | Admin Profile</title>
            </Helmet>
            <Container>
                <SectionTitle heading={"Admin Profile"}></SectionTitle>
                <div className='flex gap-9 py-5 max-w-lg mx-auto text-white'>
                    <div>
                        <img className='w-52 rounded-xl' src={currentUser?.image}alt="" />
                    </div>
                    <div className='flex flex-col items-center gap-4 justify-center'>
                        <div className='flex gap-6 justify-center items-center'>
                            <h2 className="lg:text-2xl text-xl flex gap-3">Name: <span className='font-bold'>{currentUser?.name}</span></h2>
                            <img className='w-10' src={currentUser?.badge?.props?.src} alt="" />
                        </div>
                        <h4 className="text-xl">Email: <span className='font-bold lg:text-xl text-lg'>{currentUser?.email}</span></h4>
                        <h2 className="lg:text-2xl text-xl">Items Added : <span className='font-bold'>{items.length}</span></h2>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminProfile;