// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useMeals from '../../../../hooks/useMeals';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const AllReviews = () => {
    const [meals] = useMeals();
    const [matchedMeals, setMatchedMeals] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
            return res.data;
        }
    })

    useEffect(() => {
        const allReview = reviews.map(review => {
            const findMeals = meals.find(meal => meal._id === review.meal_id);
            return {
                ...review,
                findMeals
            }
        })
        setMatchedMeals(allReview)
    }, [meals, reviews])

    const sort = matchedMeals.sort((a, b) => b.likes.length > a.likes.length ? 1 : -1 || b.reviews > a.reviews ? 1 : -1);

    const handleDelete = meal => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${meal?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${meal?.findMeals?.title}'s review has been deleted`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });

    }



    return (
        <div>
             <Helmet>
                <title>Cooking God | All Reviews</title>
            </Helmet>
            <div className="overflow-x-auto shadow-amber-200 shadow-xl max-w-4xl mx-auto">
                <SectionTitle heading={'All Reviews'}></SectionTitle>
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Delete</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sort?.map((meal, ind) => <tr key={meal._id}>
                                <th>
                                    {ind + 1}
                                </th>
                                <td>
                                    <h2 className="font-bold">{meal?.findMeals?.title}</h2>
                                </td>
                                <td>
                                    {meal?.findMeals?.likes?.length}
                                </td>
                                <td>{meal?.findMeals?.reviews}</td>
                                <th>
                                    <button onClick={() => handleDelete(meal)} className="btn btn-error btn-sm">Delete</button>
                                </th>
                                <th>
                                    <Link to={`/meals/${meal?.meal_id}`}>
                                        <button className="btn btn-accent btn-sm">View Details</button>
                                    </Link>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;