// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePackages from '../../hooks/usePackages';
import Container from '../../Shared/Container';
import { Rating } from '@smastrom/react-rating';
import SectionTitle from '../../Compounts/SectionTitle/SectionTitle';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';


const Checkout = () => {
    const {setItems, setPackageName} = useAuth();
    const [packages] = usePackages();
    const { packageName } = useParams();
    const [filteredItem, setFilteredItem] = useState([]);
    const navigate =  useNavigate();

    useEffect(() => {
        const packageItems = packages.filter(item => item.packageName === packageName);
        const findItems = packageItems[0]?.items?.map(item => item)


        setFilteredItem(findItems)
    }, [packages, packageName])

    const totalPrice = filteredItem?.reduce((total, item) => total + item.price, 0)

    const handlePay = () =>{
        setPackageName(packageName)
        setItems(totalPrice)
        navigate('/payment')
    }


    return (
        <div className='pt-20'>
            <Helmet>
                <title>Cooking God | Checkout</title>
            </Helmet>
            <SectionTitle heading={"Your Package Items"}></SectionTitle>
            <Container>
                <div className='flex justify-between border-2 border-stone-400 bg-[#48c6d2] p-2 rounded-lg mb-5'>
                    <h2 className="text-3xl">Total Items: 0{filteredItem?.length} </h2>
                    <h2 className="text-3xl">Total Price: TK. {totalPrice} </h2>
                    <button onClick={handlePay} className="btn btn-warning">Pay</button>
                </div>
                <div className='grid grid-cols-2 gap-8'>
                    {
                        filteredItem?.map(item => <div key={item._id} className="card  bg-slate-100 shadow-xl">
                            <figure><img src={item?.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">{item?.title}</h2>
                                <p className='text-xl'>Price: TK. {item?.price}</p>
                                <p>Rating:  <Rating
                                    style={{ maxWidth: 180 }}
                                    value={item?.rating}
                                    readOnly
                                /></p>
                            </div>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};
export default Checkout;