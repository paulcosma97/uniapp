import React from "react";
import Layout from "../../shared/components/layout/Layout";
import { Typography } from "antd";
import './HomePage.css';

const HomePage: React.FC = () => (
    <Layout>
        <img src="/logo.png" alt="UniApp Logo" className="homepage-logo"/>
        <Typography.Title className="homepage-title" >Bine ai venit!</Typography.Title>
    </Layout>
);

export default HomePage;