// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import darkMode from '../Compounts/dark';
import { GoMoon } from 'react-icons/go';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { IoIosCloseCircle } from "react-icons/io";
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    const navlinks = <>
        <li>
            <button
                onClick={() => setIsSideMenuOpen(false)}
                className=" text-white text-2xl float-end font-semibold lg:hidden"
            >
                <IoIosCloseCircle />
            </button>
        </li>
        <li className='font-bold'>
            <NavLink onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} to='/'>Home</NavLink>
        </li>
        <li className='font-bold'>
            <NavLink onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} to='/meals'>Meals</NavLink>
        </li>
        <li className='font-bold'>
            <NavLink onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} to='/upcoming'>Upcoming Meals</NavLink>
        </li>
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
                    className="navbar fixed max-w-5xl pt-3 z-10 backdrop-contrast-200 text-sky-600">
                    <div className="navbar-start">
                        <div className="lg:hidden">
                            <button
                                className="mr-5 mb-4 rounded-md focus:outline-none focus:shadow-outline-purple"
                                onClick={toggleSideMenu}
                                aria-label="Menu"
                            >
                                {isSideMenuOpen ? (
                                    <FaXmark className="w-4 h-4" />
                                ) : (
                                    <FaBarsStaggered className="w-4 h-4" />
                                )}
                            </button>
                            <ul tabIndex={0} className={`text-sky-700 lg:hidden absolute md:-top-4 top-2 left-0 right-0 w-[100vw] transition-all duration-500 flex flex-col items-center text-center gap-5 hero-overlay ${isSideMenuOpen
                                ? "opacity-100 visible h-screen"
                                : "opacity-0 invisible h-0"
                                } bg-opacity-90 bg-black py-10 shadow`}>
                                {navlinks}
                            </ul>
                        </div>
                        <img className='lg:w-16 md:w-12 w-5' src="https://i.ibb.co/N7XmXZr/logo-2.png" alt="" /> <span className='font-extrabold text-sm text-purple-800'>Cooking God</span>
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
                        <div className='lg:mr-3'>
                            {user ? <details className="dropdown mr-1">
                                <summary className="m-1 rounded-bl-3xl rounded-tr-3xl btn btn-neutral login hover:border-blue-600 border-2">
                                    <img className='w-8 rounded-full' src={user?.photoURL} alt="" />
                                </summary>
                                <ul className="py-4 space-y-2 shadow menu dropdown-content z-[1] -ml-5 bg-base-100 rounded-box w-24">
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