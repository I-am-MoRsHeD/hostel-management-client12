// eslint-disable-next-line no-unused-vars
import React from 'react';
import useMeals from '../../../../hooks/useMeals';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllMeals = () => {
    const [meals, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    // console.log(meals);

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
                axiosSecure.delete(`/meals/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Meals has been deleted..!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    
    return (
        <div>
             <Helmet>
                <title>Cooking God | All Meals</title>
            </Helmet>
            <SectionTitle heading={"All Meals Here"}></SectionTitle>
            <div className="overflow-x-auto shadow-amber-200 text-white shadow-xl max-w-4xl mx-auto">
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Distributor Name</th>
                            <th>Distributor Email</th>
                            <th>Delete</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meals?.map((meal, index) => <tr key={meal?._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="font-bold">{meal?.title}</div>
                                </td>
                                <td>
                                    {meal?.likes?.length}
                                </td>
                                <td>{meal?.reviews}</td>
                                <td>{meal?.distributor}</td>
                                <td>{meal?.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(meal?._id)} className="btn btn-error btn-sm">
                                        Delete
                                    </button>
                                </td>
                                <th className='flex gap-2'>
                                    <button className="btn btn-accent btn-sm">Update</button>
                                    <Link to={`/meals/${meal?._id}`}>
                                        <button className="btn btn-warning btn-sm">View Details</button>
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

export default AllMeals;