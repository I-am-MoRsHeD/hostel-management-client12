/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-5xl mx-auto'>
            {children}
        </div>
    );
};

export default Container;