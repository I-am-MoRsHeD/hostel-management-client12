// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../../Shared/Container';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import { motion } from 'framer-motion';
import SocialLogin from '../../Compounts/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Register = () => {
    const { createUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data?.email, data?.password)
            .then(result => {
                console.log("from reg", result.user);

                updateProfile(result.user, {
                    displayName: data?.name,
                    photoURL: data?.photo
                })
                    .then(() => {
                        const userInfo = {
                            email: data?.email,
                            name: data?.name,
                            image: data?.photo,
                            badge: "https://i.ibb.co/wzY7xRG/bronze.png"
                        }
                        // insert data to the database
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: "Nice!",
                                        text: "Registerd Successfully!",
                                        icon: "success"
                                    });
                                    navigate(from, { replace: true })
                                }
                            });

                    })


            })
    }

    return (
        <Container>
            <div className='flex lg:flex-row md:flex-col justify-evenly items-center lg:h-[100vh] h-full my-10'>
                <motion.div
                    initial={{ x: '-70vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1.6, delay: 0.3, type: 'spring', stiffness: 50 }}
                >
                    <img className='w-[500px] h-[600px]' src="https://i.ibb.co/KNYr3Bn/login-image.jpg" alt="" />
                </motion.div>
                <motion.form
                    initial={{ x: '70vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1.6, delay: 0.3, type: 'spring', stiffness: 50 }}
                    onSubmit={handleSubmit(onSubmit)} className="card-body  bg-sky-600 h-ful w-[450px] shadow-2xl">
                    <h2 className="text-3xl text-center mb-10 font-bold">Register</h2>
                    <div className="form-control mb-6 border-b-2 text-white">
                        <input
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            placeholder="Name" className="input"
                        />

                    </div>
                    {errors.name?.type == "required" && (
                        <span className='text-red-600 -mt-5'>Name is required</span>
                    )}
                    <div className="form-control mb-6 border-b-2 text-white">
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            placeholder="Email" className="input"
                        />
                    </div>
                    {errors.email?.type == "required" && (
                        <span className='text-red-600 -mt-5'>Email is required</span>
                    )}
                    <div className="form-control mb-6 border-b-2 text-white">
                        <input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                            })}
                            placeholder="Password" className="input"
                        />
                        {errors.password?.type == "required" && (
                            <span className='text-red-600 -mt-5'>Password is required</span>
                        )}
                        {errors.password?.type == "minLength" && (
                            <span className='text-red-600 -mt-5'>Password must be atleast 6 characters</span>
                        )}
                        {errors.password?.type == "maxLength" && (
                            <span className='text-red-600 -mt-5'>Password must be maximum 20 characters</span>
                        )}
                        {errors.password?.type == "pattern" && (
                            <span className='text-red-600 -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
                        )}
                    </div>
                    <div className="form-control mb-6 border-b-2 text-white">
                        <input
                            name="photo"
                            {...register("photo")}
                            placeholder="Photo URL" className="input"
                        />
                    </div>
                    <div className="form-control mt-6 text-white">
                        <button className="btn btn-warning hover:btn-ghost">Register</button>
                    </div>
                    <div className='mt-2'>
                        <p className='text-xl'>Already have an account? Please <Link className='font-semibold text-yellow-500 underline' to='/login'>Login</Link></p>
                    </div>
                    <SocialLogin></SocialLogin>
                </motion.form>
            </div>
        </Container>
    );
};

export default Register;