// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {

    // const isAdmin = true;
    const [isAdmin] = useAdmin();

    return (
        <div className='flex'>
            <div className='w-52 bg-sky-700 text-white min-h-screen'>
                <Helmet>
                    <title>Cooking God | Dashboard</title>
                </Helmet>
                {/* Admin panel */}
                <div className=''>
                    <ul className="menu">

                        {
                            isAdmin ? <>
                                {/* Admin panel */}
                                <li>
                                    <NavLink defaultChecked to='/dashboard/adminProfile'>Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageUsers'>Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addMeal'>Add Meal</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allMeals'>All Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allReviews'>All Reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/serveMeals'>Serve Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/upcomingMeals'>Upcoming Meals</NavLink>
                                </li>
                            </> : <>
                                {/* User panel */}
                                <li>
                                    <NavLink defaultChecked to='/dashboard/myProfile'>My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/requestedMeals'>Requested Meals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myReviews'>My Reviews</NavLink>
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
            <div className='flex-1 bg-slate-200'>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Dashboard;