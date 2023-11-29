// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const AddMeal = () => {
    const { user } = useAuth();
    const [items, setItems] = useState('');
    const [mealInfo, setMealInfo] = useState({});
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();


    const onSubmit = (data) => {
        const mealDetails = {
            title: data.title,
            category: data?.category,
            image: data?.image,
            distributor: data.name,
            rating: parseInt(data.rating),
            ingredients: data.ingredients.split('\n'),
            postTime: data.date,
            desc: data.desc,
            // likes: parseInt(data.likes),
            likes: [],
            reviews: parseInt(data.reviews),
            email: data.email,
            price: data.price
        }
        setMealInfo(mealDetails);
    }

    useEffect(() => {
        if (items) {
            axiosSecure.post(items === 'AddMeal' ? '/meals' : '/upcoming', mealInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Added!",
                            text: items === 'AddMeal' ? "Meal has been added!" : "Meal has been added to Upcoming Meals",
                            icon: "success"
                        });
                        setItems('');
                    }
                })
        }


        console.log(mealInfo, items)
    }, [mealInfo, items, axiosSecure])



    return (
        <div className='shadow-amber-200 shadow-xl max-w-4xl mx-auto'>
             <Helmet>
                <title>Cooking God | Add Meal</title>
            </Helmet>
            <div>
                <SectionTitle heading={"Add a Meal"}></SectionTitle>
                <form className='text-white' onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="form-control w-full my-1">
                        <label className="label">
                            <span className="label-text">Meal Title*</span>
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Meal Title"
                            className="input input-bordered w-full" />
                    </div>
                    <div className='flex gap-6'>
                        {/* category */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        {/* rating */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Rating*</span>
                            </label>
                            <input
                                {...register("rating", { required: true })}
                                type="number"
                                placeholder="Rating"
                                className="input input-bordered w-full" />
                        </div>
                        {/* Date */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Date*(mm/dd/yyyy)</span>
                            </label>
                            <input
                                {...register("date", { required: true })}
                                type="date"
                                placeholder="Date"
                                className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        {/* description */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Description*</span>
                            </label>
                            <textarea {...register('desc', { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        </div>
                        {/* Ingredients */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Ingredients*</span>
                            </label>
                            <textarea {...register('ingredients', { required: true })} className="textarea textarea-bordered h-24" placeholder="Give 3 or more ingredients name and one value in one line(no comma please)"></textarea>
                        </div>
                    </div>
                    {/* Image */}
                    <div className='form-control w-full my-1'>
                        <label className="label">
                            <span className="label-text">Image URL*</span>
                        </label>
                        <input
                            {...register("image", { required: true })}
                            type="text"
                            placeholder="Image URL"
                            className="input input-bordered w-full" />
                    </div>

                    <div className='flex gap-6'>
                        {/* admin name */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Admin Name</span>
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full" />
                        </div>
                        {/* admin email */}
                        <div className="form-control w-full my-1">
                            <label className="label">
                                <span className="label-text">Admin Email</span>
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                defaultValue={user?.email}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <button onClick={() => setItems('AddMeal')} className="btn btn-warning w-1/2 mt-4">Add Meal</button>
                    <button onClick={() => setItems('AddUpcomingMeals')} className="btn btn-accent w-1/2">Add to Upcoming Meals</button>

                </form>
            </div>
        </div>
    );
};

export default AddMeal;