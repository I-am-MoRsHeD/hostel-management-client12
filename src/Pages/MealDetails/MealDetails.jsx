// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useMeals from '../../hooks/useMeals';

import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import Container from '../../Shared/Container';
// import { AiOutlineLike } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MealDetails = () => {
    const { user } = useAuth();
    const [meals, refetch] = useMeals();
    const { id } = useParams();
    const [mealDetails, setMealDetails] = useState([]);
    const [matchUser, setMatchUser] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const reviewRef = useRef();

    const { data: users = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })


    useEffect(() => {
        const findMeal = meals?.filter(meal => meal._id === id);
        setMealDetails(findMeal);

        const findUser = users.filter(currentUser => currentUser?.email === user?.email);
        setMatchUser(findUser)

    }, [id, meals, users, user?.email])


    const handleLike = detail => {
        if (matchUser?.role === 'Admin') {
            return;
        }
        else if (!user) {
            return;
        }
        else {
            const liked = user?.email;
            axiosPublic.patch(`/meals/like/${detail?._id}`, { liked })
                .then(res => {
                    console.log('like counted', res.data);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                    }
                })

        }
    }

    const handleRequest = detail => {
        if (!user) {
            Swal.fire({
                title: "You need to login to review!",
                text: "Do you want to login?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Sure!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
        else if (matchUser[0]?.role === 'Admin') {
            return Swal.fire({
                title: "Sorry!",
                text: "You cannot request for meal",
                icon: "error"
            });
        }
        else if (!matchUser[0]?.packageName) {
            return Swal.fire({
                title: "Sorry!",
                text: "You didn't buy any package!",
                icon: "error"
            });
        }
        else {
            const mealInfo = {
                email: user?.email,
                name: user?.displayName,
                status: 'pending',
                meal_id: detail?._id,
                title: detail?.title
            }

            axiosPublic.post('/mealRequest', mealInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Wow..!",
                            text: "Meal requested successfully!",
                            icon: "success"
                        });
                    }
                })
        }
    }

    const handleReview = (detail) => {
        if (user?.role === 'Admin') {
            return;
        }
        else if(reviewRef.current.value == ''){
            return Swal.fire({
                title: "Sorry!",
                text: "Review field is empty.",
                icon: "error"
            });
        }
        else if (user) {
            let count = 0;
            const reviewed = count + 1;
            const check = 'review';
            const review = reviewRef.current.value;
            const reviewInfo = {
                email: user?.email,
                name: user?.displayName,
                reviews: review,
                meal_id: detail?._id,
            }
            console.log(reviewed, reviewInfo)

            // inset the data to the server
            axiosPublic.post('/reviews', reviewInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Added!",
                            text: "Your file has been added.",
                            icon: "success"
                        });
                    }
                })

            // review counted
            axiosPublic.patch(`/meals/${detail?._id}`, { reviewed, check })
                .then(res => {
                    console.log('review counted', res.data);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "You need to login to review!",
                text: "Do you want to login?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Sure!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });

                    //   Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    //   });
                }
            });
        }
    }

    return (
        <Container>
            <Helmet>
                <title>Cooking God | Meals Details</title>
            </Helmet>
            <div className=''>
                {
                    mealDetails?.map(detail => <div key={detail._id} className="card card-compact shadow-xl pt-20">
                        <figure><img src={detail?.image} alt={detail?.title} /></figure>

                        {/* details body */}
                        <div className="px-10 py-20 flex flex-col lg:flex-row justify-between">
                            <div className='lg:w-1/3 space-y-5'>
                                <h2>Posted By : <span className="text-2xl font-bold">{detail?.distributor}</span></h2>
                                <p>Posted: <span className='font-bold'>{detail?.postTime}</span></p>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={detail.rating
                                    }
                                    readOnly
                                />
                                <button
                                    onClick={() => handleLike(detail)} className='btn btn-accent' >
                                    {detail.likes.includes(user?.email) ? 'Liked' : 'Like'} 
                                </button>

                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className='lg:w-2/3 mt-5 lg:mt-0 lg:ml-10 space-y-5'>
                                <h2 className="card-title text-3xl font-bold">{detail?.title}</h2>
                                <p>{detail?.desc}</p>
                                <p className='font-semibold'> Ingredients are -
                                    <span className='font-normal text-lg'>
                                        {
                                            detail?.ingredients?.map((items, ind) => <li key={ind}>
                                                {items}
                                            </li>)
                                        }
                                    </span>
                                </p>
                                <div className="card-actions">
                                    <button
                                        onClick={() => handleRequest(detail)}
                                        className="btn btn-primary">Request for Meal</button>
                                </div>
                                <div>
                                    <textarea ref={reviewRef} className="textarea w-full textarea-primary text-white" name="review" id="" cols="" rows="4" placeholder='Give a Review'></textarea>
                                    <button
                                        onClick={() => handleReview(detail)}
                                        className="btn">Give Review {detail?.reviews}</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                <div>

                </div>
            </div>

        </Container>
    );
};

export default MealDetails;