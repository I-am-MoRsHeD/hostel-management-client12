// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import useMeals from '../../hooks/useMeals';
import MealCard from '../Home/Meals/MealCard';
import Container from '../../Shared/Container';
import SectionTitle from '../../Compounts/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const MealsPage = () => {
    const [meals] = useMeals();
    const [filteredMeals, setFilteredMeals] = useState(meals);
    const searchRef = useRef();

    const handleSearch = () => {

        const searchInput = searchRef.current.value;
        const filterBySearchBar = meals.filter(meal => meal.title.toLowerCase() === searchInput.toLowerCase());
        {
            filterBySearchBar ? setFilteredMeals(filterBySearchBar) : <div className='text-red-600'>There is no data found</div>
        }
        searchRef.current.value = null;
    }

    // filtered by category
    const handleMeals = category => {
        if (category === 'All') {
            setFilteredMeals(meals);
        }
        else {
            const filteredMealByCategory = meals.filter(meal => meal.category === category);
            setFilteredMeals(filteredMealByCategory)
        }
    }

    // filtered by price
    const handleByPrice = price => {


        if (price === 'All') {
            setFilteredMeals(meals);
        }
        else if (price <= 300) {
            const lowerPriceItems = meals.filter(meal => meal.price <= 300);
            setFilteredMeals(lowerPriceItems)
        }
        else if (price < 601 && price > 300) {
            const mediumPriceItems = meals.filter(meal => meal.price < 601 && meal.price > 300);
            setFilteredMeals(mediumPriceItems);
        }
        else if (price < 901 && price > 600) {
            const standardPriceItems = meals.filter(meal => meal.price < 901 && meal.price > 600);
            setFilteredMeals(standardPriceItems);
        }
        else {
            const highestPriceItems = meals.filter(meal => meal.price > 900);
            setFilteredMeals(highestPriceItems);
        }
    }


    return (
        <Container>
            <Helmet>
                <title>Cooking God | Meals</title>
            </Helmet>
            <div className='pt-16'>
                <SectionTitle heading={'All Meals Here'}></SectionTitle>
                {/* search bar */}
                <div className='w-2/4 mx-auto mb-20 flex flex-row'>
                    <input ref={searchRef} type="text" placeholder="Type here" className="input input-bordered text-white input-primary w-full" />
                    <button onClick={handleSearch} className="btn btn-accent">Search</button>
                </div>
                {/* filtered tabs */}
                <div className='flex justify-between mb-10'>
                    {/* by category */}
                    <div className="dropdown dropdown-hover">
                        <summary className="m-1 btn btn-neutral hover:border-blue-600 border-2">Filter by Category</summary>
                        <ul className="py-4 space-y-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-24">
                            <button onClick={() => handleMeals('All')} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>All</button>
                            <button onClick={() => handleMeals('Breakfast')} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>Breakfast</button>
                            <button onClick={() => handleMeals('Lunch')} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>Lunch</button>
                            <button onClick={() => handleMeals('Dinner')} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>Dinner</button>
                        </ul>
                    </div>
                    {/* by price */}
                    <div className="dropdown dropdown-hover">
                        <summary className="m-1 btn btn-neutral hover:border-blue-600 border-2">Filter by Price</summary>
                        <ul className="py-4 space-y-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-24">
                            <button onClick={() => handleByPrice('All')} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>All</button>
                            <button onClick={() => handleByPrice(300)} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>100 - 300</button>
                            <button onClick={() => handleByPrice(600)} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>301 - 600</button>
                            <button onClick={() => handleByPrice(900)} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>601 - 900</button>
                            <button onClick={() => handleByPrice(901)} className='btn btn-xs btn-neutral hover:border-y-indigo-700'>901 - above</button>
                        </ul>
                    </div>
                </div>
                {/* All meals card */}
                <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
                    {
                        filteredMeals?.map(meal => <MealCard
                            meal={meal}
                            key={meal._id}></MealCard>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default MealsPage;


// className='grid md:grid-cols-3 grid-cols-1 gap-6'

