// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import Container from '../../../Shared/Container';

const Footer = () => {
    return (
        <div className='lg:mt-44 mt-10'>
            <Container>
                <div className='bg-sky-700 lg:h-64 md:h-44 h-36 flex flex-col lg:flex-row absolute w-10/12 md:w-[700px] lg:w-[1000px] lg:ml-3 ml-9 rounded-b-lg'>
                    <div className='border-t-2 lg:w-1/4 w-2/4 ml-3 lg:ml-10  mx-auto'>
                        <h5 className="lg:text-lg text-base border px-2 rounded-xl mt-1 w-3/4 text-center ">Invented:</h5>
                        <h2 className="lg:text-4xl text-xl lg:ml-14 ml-3 md:ml-32 mt-2 text-white font-bold">From 2012</h2>
                    </div>
                    <div className='border-t-2 mt-2 lg:mt-0 mr-14 lg:mr-0 md:mr-0 w-2/4 mx-auto'>
                        <h5 className="text-lg border rounded-xl w-3/4 lg:w-2/4 text-center">Located:</h5>
                        <h2 className="lg:text-4xl text-xl mt-2 ml-0 md:ml-28 lg:ml-0 text-white font-bold">Chattogram,Bangladesh</h2>
                    </div>
                </div>
            </Container>
            <footer className="flex flex-col lg:pt-72 md:pt-44 pt-32 h-[100vh] lg:p-10 md:px-10 px-2 bg-slate-700 text-base-content rounded">

                <div className='flex justify-between items-center my-8 mx-3 md:mx-16 lg:mx-20'>
                    <div>
                        <h2 className="lg:text-2xl text-base font-bold border-b-2">Direct Contact :</h2>
                        <div className='space-y-2 lg:mt-8 mt-2'>
                            <h2 className="lg:text-lg text-xs font-medium bg-[#48c6d2] border-2 text-white p-2 rounded-xl hover:border-sky-600 hover:scale-105">Email: cookingGod@gmail.com</h2>
                            <h2 className="lg:text-lg text-xs font-medium bg-[#48c6d2] border-2 text-white p-2 rounded-xl hover:border-sky-600 hover:scale-105">Cell: +8801923456789</h2>
                        </div>
                    </div>
                    <nav>
                        <h2 className="lg:text-3xl text-xl font-bold lg:mb-8 mb-2 border-b-2 ">Our Socials</h2>
                        <div className="grid grid-flow-col gap-4">
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                            <FaTwitter></FaTwitter>
                            <FaWhatsapp></FaWhatsapp>
                        </div>
                    </nav>
                </div>
                <aside className='footer-center lg:mt-5 mt-2 footer'>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>

        </div>
    );
};

export default Footer;