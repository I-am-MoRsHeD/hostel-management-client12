// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import useMeals from '../../../hooks/useMeals';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const RequestedMeals = () => {
    const { user } = useAuth();
    const [meals] = useMeals();
    const [requestedMeals, setRequestedMeals] = useState([]);
    const axiosPublic = useAxiosPublic();

    const { data: meal = [], refetch } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/mealRequest/${user?.email}`)
            return res.data;
        }
    })

    console.log(meal)

    useEffect(() => {
        const findMeal = meal.map(item => {
            const allMeal = meals.find(meal => meal._id === item.meal_id);
            return {
                ...item,
                allMeal
            }
        })
        setRequestedMeals(findMeal)
    }, [meal, meals])


    const sort = requestedMeals.sort((a, b) => b.status > a.status ? -1 : 1);


    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/mealRequest/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Requested Meal has been cancelled..!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <SectionTitle heading={"Requested Meals"}></SectionTitle>
            <Helmet>
                <title>Cooking God | Requested Meals</title>
            </Helmet>
            <div className="overflow-x-auto text-white shadow-amber-200 shadow-sm rounded-lg max-w-4xl mx-auto">
                <table className="table w-10/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>
                                #
                            </th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sort?.map((meal, ind) => <tr key={meal._id}>
                                <th>
                                    {ind + 1}
                                </th>
                                <td>
                                    <div className="font-bold">{meal?.allMeal?.title}</div>
                                </td>
                                <td>
                                {meal?.allMeal?.likes.length}
                                </td>
                                <td>{meal?.allMeal?.reviews}</td>
                                <td>{meal?.status}</td>
                                <th>
                                    <button onClick={() => handleCancel(meal._id)} className="btn btn-error">Cancel</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;

