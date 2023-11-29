// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import SectionTitle from '../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const { data: currentUser = {} } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data;
        }
    })

    const { data: about = {} } = useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/about/${user?.email}`)
            return res.data;
        }
    })

    console.log(about)

    if (currentUser?.role === 'Admin') {
        return;
    }

    const onSubmit = data => {
        console.log(data);
        const info = {
            name: data.name,
            email: data.email,
            image: data.image,
            title: data.title,
            about: data.about,
        }
        axiosSecure.post('/about', info)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your identity has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    return (
        <div className='shadow-xl  max-w-4xl mx-auto'>

            <SectionTitle heading={"My Profile"}></SectionTitle>
            <Helmet>
                <title>Cooking God | My Profile</title>
            </Helmet>
            <div className='flex gap-4 py-5 max-w-lg mx-auto'>
                <div>
                    <img className='w-52 rounded-xl' src={currentUser?.image} alt="" />
                </div>
                <div className='flex flex-col items-center gap-4 justify-center'>
                    <div className='flex gap-6 justify-center items-center'>
                        <h2 className="text-2xl font-semibold">Name: <span className='font-bold'>{currentUser?.name}</span></h2>
                        <img className='w-10' src={currentUser?.badge} alt="" />
                    </div>
                    <h4 className="text-2xl font-semibold">Email: {currentUser?.email}</h4>
                </div>
            </div>
            <div className="divider"></div>
            {/* about me section */}
            <SectionTitle heading={'About Me'}></SectionTitle>
            <div>
                {/* Modal */}
                <div>
                    {/* modal */}
                    <div className='w-11/12 mb-5 pb-5 flex justify-end'>
                        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Edit</button>
                    </div>
                    <dialog id="my_modal_1" className="modal ">
                        <div className="modal-box bg-slate-200">

                            <form className='text-white' onSubmit={handleSubmit(onSubmit)}>
                                {/* input -1 */}
                                <div className='flex gap-6'>
                                    {/* name */}
                                    <div className="form-control w-full my-1">
                                        <label className="label">
                                            <span className="label-text">User Name</span>
                                        </label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            defaultValue={user?.displayName}
                                            className="input input-bordered w-full" />
                                    </div>
                                    {/* email */}
                                    <div className="form-control w-full my-1">
                                        <label className="label">
                                            <span className="label-text">User Email</span>
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            defaultValue={user?.email}
                                            className="input input-bordered w-full" />
                                    </div>
                                </div>
                                {/* input 2 */}
                                <div className='flex gap-6'>
                                    {/* image */}
                                    <div className='form-control w-full my-1'>
                                        <label className="label">
                                            <span className="label-text">Image URL*</span>
                                        </label>
                                        <input
                                            {...register("image", { required: true })}
                                            type="text"
                                            defaultValue={user?.photoURL}
                                            placeholder="Image URL"
                                            className="input input-bordered w-full" />
                                    </div>
                                    {/* title */}
                                    <div className="form-control w-full my-1">
                                        <label className="label">
                                            <span className="label-text">Title*</span>
                                        </label>
                                        <input
                                            {...register("title", { required: true })}
                                            type="text"
                                            placeholder="Title"
                                            className="input input-bordered w-full" />
                                    </div>
                                </div>
                                {/* about */}
                                <div className="form-control w-full my-1">
                                    <label className="label">
                                        <span className="label-text">About*</span>
                                    </label>
                                    <textarea {...register('about', { required: true })} className="textarea textarea-bordered h-24" placeholder="About You...."></textarea>
                                </div>
                                <button className="btn btn-warning w-1/2 mt-4">Add</button>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/* <button onClick={handleEdit} className="btn">Edit</button> */}
                </div>
                {/* about me info */}
                <div>
                    <div className="flex justify-center items-center shadow-xl pb-10">
                        <figure><img className='w-80' src={about?.image} alt="Profile" /></figure>
                        <div className="divider divider-accent lg:divider-horizontal "></div>
                        <div className="w-1/2 ml-5">
                            <h2 className="mb-8 font-bold font-mono">{about?.title}</h2>
                            <p className='w-full text-base'>{about?.about}.</p>
                            <p className='mt-14 ml-40 bg-[#48c6d2] rounded-lg p-1'>Contact: <span className='font-semibold'>{about?.email}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;