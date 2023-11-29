// eslint-disable-next-line no-unused-vars
import React from 'react';


const Faq = () => {
    return (
        <div className='flex lg:flex-row flex-col items-center justify-between py-10'>
            {/* faq gif */}
            <div className='w-1/2'>
                <img className='w-full' src="https://i.ibb.co/6wqKk1T/FAQs.gif" alt="" />
            </div>
            {/* faq questions and answers */}
            <div className='lg:w-1/2 w-full space-y-5 p-4'>
                <div className="collapse collapse-arrow bg-black text-white shadow-white shadow-lg">
                    <input type="radio" name="my-accordion-2" defaultChecked/>
                    <div className="collapse-title text-2xl font-bold">
                        Why will i choose you?
                    </div>
                    <div className="collapse-content">
                        <p>We are providing you the best quality of service and also authentic meals that will not harmful obviously....</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-black text-white shadow-white shadow-lg">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-2xl font-bold">
                        Will we get 24/7 service from you?
                    </div>
                    <div className="collapse-content">
                        <p>Obviously sir.We are providing 24/7 service and whenever you need any meal,just order us and we are here to serve our  best service and also the best quality of product....</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-black text-white shadow-white shadow-lg">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-2xl font-bold">
                        What about the facilities here?
                    </div>
                    <div className="collapse-content">
                        <p>Of course sir,in our site you will get a reasonable price of all the meals.If you become our one of the member or if you buy our membership package,you will get discount and others facilities from our site...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;