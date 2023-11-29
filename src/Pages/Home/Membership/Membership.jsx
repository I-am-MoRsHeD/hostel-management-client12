// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../Compounts/SectionTitle/SectionTitle';
import usePackages from '../../../hooks/usePackages';
import { AwesomeButton } from 'react-awesome-button';

const Membership = () => {
    const [packages] = usePackages();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const packageItems = packages.map(item => item.packageName);
        setItems(packageItems)
    }, [packages])



    return (
        <div className='lg:my-10 my-3'>
            <SectionTitle heading={"Membership Packages"}></SectionTitle>
            <h2 className='text-base text-center -mt-9 mb-4 text-neutral-400'>To get reward or discount or specific facilities,buy a package...</h2>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 pt-8'>
                {/* silver package */}
                <div className="card card-compact lg:h-[40vh] h-[60vh] bg-[#48c6d2] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl mt-3 font-bold text-center">Silver Package</h2>
                        <div className="card-actions mt-20 justify-end">
                            <Link to={`/checkout/${items[0]}`}>
                            <AwesomeButton  type="secondary">Details <FaArrowRightLong className='pl-1'/></AwesomeButton>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Platinum package */}
                <div className="card card-compact lg:h-[40vh] h-[60vh] bg-[#48c6d2] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl mt-3 font-bold text-center">Platinum Package</h2>
                        <div className="card-actions mt-20 justify-end">
                            <Link to={`/checkout/${items[1]}`}>
                            <AwesomeButton  type="secondary">Details <FaArrowRightLong className='pl-1'/></AwesomeButton>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Gold package */}
                <div className="card card-compact lg:h-[40vh] h-[60vh] bg-[#48c6d2] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-2xl mt-3 font-bold text-center">Gold Package</h2>
                        <div className="card-actions mt-20 justify-end">
                            <Link to={`/checkout/${items[2]}`}>
                            <AwesomeButton  type="secondary">Details <FaArrowRightLong className='pl-1'/></AwesomeButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;