// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { signWithPopup } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleGoogle = () => {
        signWithPopup()
            .then(result => {
                // insert user to database
                const userInfo = {
                    email: result.user?.email,
                    name: result.user.displayName,
                    badge: <img src="https://i.ibb.co/wzY7xRG/bronze.png" alt="" />
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Added!",
                                text: "User has been added!",
                                icon: "success"
                            });
                        }
                        navigate('/');
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='w-44 mt-8 mx-auto'>
            <p className='text-center font-bold mb-5 text-2xl'>Or</p>
            <div className='flex lg:justify-center mt-2 rounded-full py-1 px-2 border-2 bg-orange-400 text-white '>
                <button onClick={handleGoogle} className='font-semibold p-2 flex items-center'>
                    <span className=' lg:text-xl text-base'><FaGoogle></FaGoogle></span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;