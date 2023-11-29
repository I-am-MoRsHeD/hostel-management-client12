// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();

    const { data: upcoming = [], refetch } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcoming')
            return res.data;
        }
    })
    const sort = upcoming.sort((a, b) => b.likes.length > a.likes.length ? 1 : -1);


    const handlePublish = item =>{
        axiosSecure.post('/meals', ...item)
        .then(res => {
            if(res.data.insertedId){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Meals has been added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    return (
        <div>
             <Helmet>
                <title>Cooking God | Upcoming Meals</title>
            </Helmet>
            <SectionTitle heading={"Upcoming Meals"}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table w-11/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#48c6d2] text-white'>
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sort?.map((item, ind) => <tr key={item._id}>
                                <th>
                                    {ind + 1}
                                </th>
                                <td>
                                    {item?.title}
                                </td>
                                <td>
                                    {item?.likes?.length}
                                </td>
                                <th>
                                    {
                                        item?.likes?.length > 9 ? 
                                        <button onClick={() => handlePublish(item)} className="btn btn-warning" >Publish</button>
                                         : <button className="btn btn-warning" disabled>Publish</button>
                                    }
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpcomingMeals;