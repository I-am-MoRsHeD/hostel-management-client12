// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Rating } from '@smastrom/react-rating';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";

const MealCard = ({ meal }) => {
    const { title, image, rating, price, _id } = meal;

    return (
        <div className="card bg-black shadow-slate-50 shadow-lg text-white">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='absolute right-0 font-bold bg-red-400 rounded-full top-4 mr-2 px-2'>{price}</p>
            <div className="card-body">
                <h2 className="card-title font-bold">{title}</h2>
                <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    readOnly
                />
                <div className="card-actions justify-end">
                    <Link to={`/meals/${_id}`}>
                        {/* <button className="btn">Details<FaArrowRightLong /></button> */}
                        <AwesomeButton  type="primary">Details <FaArrowRightLong className='pl-1'/></AwesomeButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;