// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Container from '../../../Shared/Container';
import SectionTitle from '../../../Compounts/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Upcoming = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    

    const { data: upcoming = [], refetch } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcoming')
            return res.data;
        }
    })

    const handleLike = item => {
        if (!user) {
            return;
        }
        else {
            const liked = user?.email;
            
            axiosPublic.patch(`/upcoming/${item._id}`, { liked })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                    }
                })

        }

    }

    return (
        <div className='py-24'>
            <Helmet>
                <title>Cooking God | Upcoming Meals</title>
            </Helmet>
            <Container>
                <SectionTitle heading={"Upcoming Meals"}></SectionTitle>
                <div className='flex flex-col  gap-9'>
                    {
                        upcoming?.map(item => <div key={item?._id} className="card card-side bg-slate-100 shadow-xl">
                            <div className=' '>
                                <img className='w-full' src={item?.image} alt="Meal" />
                            </div>
                            <div className="card-body w-[550px]">
                                <h2 className="card-title font-bold">{item?.title}</h2>
                                <p className='text-base'>{item?.desc}</p>
                                <div>
                                    <p>Price: <span className='font-bold'>{item?.price}</span></p>

                                </div>
                                <div className="card-actions justify-end">

                                    <button onClick={() => handleLike(item)} className={`btn btn-accent `}>

                                       {item?.likes.includes(user?.email) ? 'Liked' : 'Like'}
                                    </button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Upcoming;