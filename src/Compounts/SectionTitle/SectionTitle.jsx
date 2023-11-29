// eslint-disable-next-line no-unused-vars
import React from 'react';

const SectionTitle = ({ heading }) => {
    return (
        <div className='w-6/12 mx-auto text-center my-10'>
            <p className='text-yellow-500 text-3xl font-bold font-mono'>~~ {heading} ~~</p>
            <div className="divider"></div>
        </div>
    );
};

export default SectionTitle;