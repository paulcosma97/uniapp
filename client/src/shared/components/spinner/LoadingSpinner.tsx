import React from "react";
import {Spin} from "antd";
import './LoadingSpinner.css'

const LoadingSpinner: React.FC = () => (
    <div className="loading-spinner-wrapper">
        <Spin className="loading-spinner" tip="Se încarcă" size="large" />
    </div>
);

export default LoadingSpinner;