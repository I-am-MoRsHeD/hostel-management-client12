// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from '../../../Shared/Container';
import Banner from '../Banner/Banner';
import Meals from '../Meals/Meals';
import Faq from '../Faq/Faq';
import Membership from '../Membership/Membership';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Container>
                <Helmet>
                    <title>Cooking God | Home</title>
                </Helmet>
                <Banner></Banner>
                <Meals></Meals>
                <Faq></Faq>
                <Membership></Membership>
            </Container>
        </div>
    );
};

export default Home;