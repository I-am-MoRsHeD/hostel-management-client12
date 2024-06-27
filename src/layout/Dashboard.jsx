// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { Helmet } from 'react-helmet-async';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Dashboard = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };
    // const isAdmin = true;
    const [isAdmin] = useAdmin();

    return (
        <div className='lg:flex bg-black'>

            <div className={`lg:w-52 text-white lg:min-h-screen`}>
                <Helmet>
                    <title>Cooking God | Dashboard</title>
                </Helmet>
                {/* Admin panel */}
                <div className=''>
                    <div className='lg:hidden'>
                        <button
                            className="p-1 mr-5 mb-4 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                            
                            aria-label="Menu"
                        >
                            {isSideMenuOpen ? (
                                <div className='bg-sky-700 w-52 pl-4 ease-in-out duration-300'><FaXmark onClick={toggleSideMenu} className="w-6 h-6" /></div>
                            ) : (
                                <div className='pl-4'><FaBarsStaggered onClick={toggleSideMenu} className="w-6 h-6" /></div>
                            )}
                        </button>
                    </div>
                    {/* responsive */}
                    <ul className={`menu z-20 fixed w-52 mt-7 duration-300 inset-y-0 ease-in-out overflow-y-auto bg-sky-700 ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
                        } lg:hidden`}>

                        {
                            isAdmin ? <>
                                {/* Admin panel */}
                                <li>
                                    <NavLink defaultChecked to='adminProfile'>Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='manageUsers'>Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='addMeal'>Add Meal</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allMeals'>All Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allReviews'>All Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink to='serveMeals'>Serve Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='upcomingMeals'>Upcoming Meals</NavLink>
                                </li>
                            </> : <>
                                {/* User panel */}
                                <li>
                                    <NavLink defaultChecked to='myProfile'>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='requestedMeals'>Requested Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='myReviews'>My Reviews</NavLink>
                                </li>
                            </>}
                        {/* divider */}
                        <div className="divider divider-primary px-4"></div>
                        {/* shared components */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/meals'>Meals</NavLink></li>
                        <li><NavLink to='/upcoming'>Upcoming Meals</NavLink></li>

                    </ul>
                    {/* desktop */}
                    <ul className={`menu w-52 hidden fixed lg:block bg-sky-700 h-[100vh]`}>

                        {
                            isAdmin ? <>
                                {/* Admin panel */}
                                <li>
                                    <NavLink defaultChecked to='adminProfile'>Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='manageUsers'>Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='addMeal'>Add Meal</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allMeals'>All Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allReviews'>All Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink to='serveMeals'>Serve Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='upcomingMeals'>Upcoming Meals</NavLink>
                                </li>
                            </> : <>
                                {/* User panel */}
                                <li>
                                    <NavLink defaultChecked to='myProfile'>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='requestedMeals'>Requested Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='myReviews'>My Reviews</NavLink>
                                </li>
                            </>}
                        {/* divider */}
                        <div className="divider divider-primary px-4"></div>
                        {/* shared components */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/meals'>Meals</NavLink></li>
                        <li><NavLink to='/upcoming'>Upcoming Meals</NavLink></li>

                    </ul>
                </div>
            </div>
            {/* display contents */}
            <div className='lg:flex-1 mx-2'>
                {isAdmin ? <Navigate to='adminProfile' replace /> : <Navigate to='myProfile' replace />}
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Dashboard;