// eslint-disable-next-line no-unused-vars
import React from 'react';
import MealCard from './MealCard';

const MealTab = ({ item }) => {

    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
            {
                item?.map(meal => <MealCard
                    meal={meal}
                    key={meal._id}></MealCard>)
            }
        </div>
    );

};

export default MealTab;