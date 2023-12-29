// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useMeals from '../../../hooks/useMeals';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const MyReview = () => {
    const axiosPublic = useAxiosPublic();
    const [meals] = useMeals();
    const { user } = useAuth();
    const [reviewMeals, setReviewMeals] = useState([]);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['review', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/${user?.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        const findReview = reviews.map(review => {
            const mealItem = meals.find(meal => meal._id === review.meal_id)
            return {
                ...review,
                mealItem
            }
        })
        setReviewMeals(findReview)
    }, [meals, reviews])


    const handleDelete = id => {
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
                axiosPublic.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Reviews has been deleted..!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const hanldeEdit = e => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;

        axiosPublic.patch(`/reviews/$`, {review})
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Reviews has been updated..!",
                        icon: "success"
                    });
                }
            })

    }

    // console.log(reviews)

    return (
        <div>
            <SectionTitle  heading={'My Reviews'}></SectionTitle>
            <Helmet>
                <title>Cooking God | My Reviews</title>
            </Helmet>
            <div className="overflow-x-auto text-white shadow-amber-200 shadow-xl max-w-4xl mx-auto">
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>
                                #
                            </th>
                            <th>Meal Title</th>
                            <th>Review</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Delete</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviewMeals?.map((detail, index) => <tr key={detail._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{detail.mealItem.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='text-sm'>{detail?.reviews}</p>
                                </td>
                                <td>
                                    {detail.mealItem.likes.length}
                                </td>
                                <td>{detail.mealItem.reviews}</td>
                                <th>
                                    <button onClick={() => handleDelete(detail?._id)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                                <th>
                                    {/* edit button */}
                                    <button className="btn btn-accent btn-xs" onClick={() => document.getElementById('my_modal_1').showModal()}>Edit</button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box bg-slate-200">

                                            <form onSubmit={hanldeEdit}>
                                                <textarea name="review" defaultValue={detail?.reviews} id="" cols="50" rows="5"></textarea>
                                                <input className='btn' type="submit" value="Update" />
                                            </form>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* details button */}
                                    <Link to={`/meals/${detail?.mealItem?._id}`}>
                                        <button className="btn btn-warning btn-xs ">Details</button>
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

export default MyReview;