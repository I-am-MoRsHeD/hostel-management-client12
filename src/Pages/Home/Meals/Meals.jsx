// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMeals from '../../../hooks/useMeals';
import MealTab from './MealTab';
import MealCard from './MealCard';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";

const Services = () => {
    const [meals] = useMeals();


    const breakfast = meals.filter(meal => meal.category === 'Breakfast');
    const lunch = meals.filter(meal => meal.category === 'Lunch');
    const dinner = meals.filter(meal => meal.category === 'Dinner');


    return (
        <div className='my-24 space-y-10'>
            <h2 className="text-4xl font-bold text-center">Our All Meals</h2>
            <Tabs>
                <div className='text-center mb-10'>
                    <TabList>
                        <Tab>All Meals</Tab>
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                        {
                            meals?.slice(0, 9)?.map(meal => <MealCard
                                meal={meal}
                                key={meal._id}></MealCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <MealTab item={breakfast}></MealTab>
                </TabPanel>
                <TabPanel>
                    <MealTab item={lunch}></MealTab>
                </TabPanel>
                <TabPanel>
                    <MealTab item={dinner}></MealTab>
                </TabPanel>
            </Tabs>
            <div className={meals?.length === 9 ? 'hidden' : 'w-20 mx-auto'}>

                <Link to='/meals'>
                <AwesomeButton type="github"  >See All</AwesomeButton>
                    
                </Link>

            </div>
        </div>
    );
};

export default Services;