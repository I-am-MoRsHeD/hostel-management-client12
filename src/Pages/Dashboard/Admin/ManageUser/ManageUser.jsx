// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa6';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user?.name} is now an admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
             <Helmet>
                <title>Cooking God | Manage Users</title>
            </Helmet>
            <SectionTitle heading={"All Users"}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, ind) => <tr key={user._id}>
                                <th>
                                    {ind + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.email}
                                </td>
                                <td>
                                    {user.role === 'Admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs ml-4"><FaUsers></FaUsers></button>}
                                </td>
                                <th>
                                    <img className='w-10 ml-5' src={user?.badge} alt="" />
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageUser;