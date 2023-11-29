// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SectionTitle from '../../Compounts/SectionTitle/SectionTitle';
import Container from '../../Shared/Container';
import { Helmet } from 'react-helmet-async';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
// console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    return (
        <div className=' py-20'>
            <Helmet>
                <title>Cooking God | Payment</title>
            </Helmet>
            <Container>
                <SectionTitle heading={"Payment Please..!"}></SectionTitle>
                <Elements stripe={stripePromise}>
                    <CheckoutForm ></CheckoutForm>
                </Elements>
            </Container>
        </div>
    );
};

export default Payment;