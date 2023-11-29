// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();

    const { data: serveMeals = [], refetch } = useQuery({
        queryKey: ['serveMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get('/mealRequest')
            return res.data;
        }
    })

    const handleServe = meal => {
        if (meal?.status === 'delivered') {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Meal already delivered",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {

            const status = 'delivered';
            axiosSecure.patch(`/mealRequest/${meal?._id}`, { status })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Meal has been served",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }

    }

    return (
        <div>
             <Helmet>
                <title>Cooking God | Serve Meals</title>
            </Helmet>
            <SectionTitle heading={"Serve Meals"}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serveMeals?.map((meal, ind) => <tr key={meal._id}>
                                <th>
                                    {ind + 1}
                                </th>
                                <th>
                                    {meal?.title}
                                </th>
                                <td>
                                    {meal?.email}
                                </td>
                                <td>
                                    {meal?.name}
                                </td>
                                <td>{meal?.status}</td>
                                <th>
                                    <button onClick={() => handleServe(meal)} className="btn btn-accent ">Serve</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;