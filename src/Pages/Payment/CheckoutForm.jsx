// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const CheckoutForm = () => {
    const { items, user, packageName } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: items })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, items])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user?.role === 'Admin'){
            return;
        }

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log("error occurs", error)
            setError(error.message)
        }
        else {
            console.log("Payment Method", paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })
        if (confirmError) {
            setError('Confirm error');
        }
        else {
            setError('');
            console.log('payment confirm', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // silver data
                if (packageName === 'Silver') {
                    const info = {
                        packageName: packageName,
                        image: <img src="https://i.ibb.co/fDCYP2f/silver.png" alt="" />,
                    }
                    console.log(info)
                    axiosPublic.patch(`/users/${user?.email}`, { info })
                    .then(res =>{
                        if(res.data.modifiedCount > 0){
                            Swal.fire({
                                title: "Success!",
                                text: "Package has been bought..!",
                                icon: "success"
                            });
                        }
                    })
                }
                // platinum data
                else if (packageName === 'Platinum') {
                    const info = {
                        packageName,
                        image: <img src="https://i.ibb.co/jfYfVTX/platinum.png" alt="" />,
                    }
                    console.log(info)
                    axiosPublic.patch(`/users/${user?.email}`, { info })
                    .then(res =>{
                        if(res.data.modifiedCount > 0){
                            Swal.fire({
                                title: "Success!",
                                text: "Package has been bought..!",
                                icon: "success"
                            });
                        }
                    })
                }
                // // Gold data
                else{
                    const info = {
                        packageName,
                        image: <img src="https://i.ibb.co/z25M1Th/gold-Badge.png" alt="" />,
                    }
                    console.log(info)
                    axiosPublic.patch(`/users/${user?.email}`, { info })
                    .then(res =>{
                        if(res.data.modifiedCount > 0){
                            Swal.fire({
                                title: "Success!",
                                text: "Package has been bought..!",
                                icon: "success"
                            });
                        }
                    })
                }
            }
        }
    }

    console.log(packageName)

    return (

        <div className='w-5/6 mx-auto'>
            <form
                className='shadow-2xl bg-slate-100'
                style={{ padding: '35px', margin: '60px 0' }}
                onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='w-1/2 mx-auto mt-10'>
                    <button
                        className='btn btn-accent w-full' type="submit" disabled={!stripe || !clientSecret }>
                        Pay
                    </button>
                    <p className="text-red-600">{error}</p>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;