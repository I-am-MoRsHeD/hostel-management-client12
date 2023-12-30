// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import darkMode from '../Compounts/dark';
import { GoMoon } from 'react-icons/go';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navlinks = <>
        <li className='font-bold'><NavLink to='/'>Home</NavLink></li>
        <li className='font-bold'><NavLink to='/meals'>Meals</NavLink></li>
        <li className='font-bold'><NavLink to='/upcoming'>Upcoming Meals</NavLink></li>
    </>
    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged Out!",
                    text: "Successfully logged out..!",
                    icon: "success"
                  });
            })
    }
    return (
        <div>
            <Container>
                <motion.div
                    initial={{ y: -170 }}
                    animate={{ y: -10 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                    className="navbar fixed max-w-5xl pt-3 z-10 backdrop-brightness-150 text-sky-600">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navlinks}
                            </ul>
                        </div>
                        <img className='lg:w-16 md:w-12 w-10' src="https://i.ibb.co/N7XmXZr/logo-2.png" alt="" /> <span className='font-extrabold text-sm text-purple-800'>Cooking God</span>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navlinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className='lg:mr-10 mr-3'>
                            <button onClick={darkMode} title='Dark Mode'>
                                <GoMoon></GoMoon>
                            </button>
                        </div>
                        <div className='lg:mr-3 mr-10'>
                            {user ? <details className="dropdown mr-6">
                                <summary className="m-1 rounded-bl-3xl rounded-tr-3xl btn btn-neutral login hover:border-blue-600 border-2">
                                    <img className='w-8 rounded-full' src={user?.photoURL} alt="" />
                                </summary>
                                <ul className="py-4 space-y-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-24">
                                    <h2 className="text-lg text-center font-bold bg-slate-700 rounded-lg">{user?.displayName}</h2>
                                    <Link className='btn btn-xs btn-neutral hover:border-y-indigo-700' to='/dashboard'>Dashboard</Link>
                                    <button className='btn btn-xs btn-neutral hover:border-y-indigo-700' onClick={handleLogout}>Logout</button>
                                </ul>
                            </details> :
                                <Link className='btn border-2 rounded-bl-3xl rounded-tr-3xl border-blue-500 hover:border-blue-500 login' to='/login'>Join Us</Link>}
                        </div>

                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default Navbar;