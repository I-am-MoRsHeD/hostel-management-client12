// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from '../../../Shared/Container';
import { motion } from 'framer-motion';
import { AwesomeButton } from 'react-awesome-button';

const Banner = () => {
    return (
        <div
            style={{ height: ["100vh"] }}
            className="bg-[url('https://i.ibb.co/Jv5xMRH/bg-1.jpg')] bg-cover overflow-x-hidden">

            <Container>
                <div className='flex flex-row md:h-[100vh] h-[100vh] lg:h-[100vh] justify-center items-center '>
                    <div className='w-2/3 lg:space-y-6 md:space-y-3 space-y-2'>
                        <motion.div
                            initial="hidden"
                            animate="visible"

                            className=" text-white space-y-2 md:px-8 px-2 lg:px-10">
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, y: -70 },
                                    visible: {
                                        opacity: 1, y: 0, transition: {
                                            delay: 0.3, duration: 0.6
                                        }
                                    }
                                }}
                                className="lg:text-4xl md:text-2xl text-lg">~~ Eat Your <span className='lg:text-6xl md:text-4xl text-2xl text-sky-500 font-bold'>Favourite Meal</span>  In </motion.h2>
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, y: -70 },
                                    visible: {
                                        opacity: 1, y: 0, transition: {
                                            delay: 0.3, duration: 0.6
                                        }
                                    }
                                }}
                                className="lg:text-4xl md:text-2xl text-lg"><span className='text-2xl md:text-4xl lg:text-6xl text-sky-500 font-bold'>Reasonable</span> Price ~~</motion.h2>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, y: 70 },
                                visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }
                            }}
                        >
                            <p className="lg:text-lg md:text-base text-sm font-semibold text-white lg:px-10 md:px-10 px-2">We are providing you better meal from others and also in a reasonable price.We also provide premium packages for our beloved users.. <br /> <span className='lg:text-3xl md:text-3xl text-2xl text-sky-500'>Grab</span> it as fast as you can!</p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, y: 70 },
                                visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }
                            }}
                            className="lg:w-3/4 w-full lg:px-10 md:px-10 px-2 flex flex-row lg:gap-5 gap-1">

                            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
                            <AwesomeButton type='primary'>Search</AwesomeButton>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ x: '100vw' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.6, delay: 0.9, type: 'spring', stiffness: 100 }}
                        className='w-1/3'>
                        <img className='lg:w-64 w-44' src="https://i.ibb.co/0y8M9GT/banner-image.png" alt="" />
                    </motion.div>
                </div>
            </Container>

        </div>
    );
};

export default Banner;