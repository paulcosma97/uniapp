import React from "react";
import {Spin} from "antd";

const LoadingSpinner: React.FC = () => (
    <div style={{ position: 'absolute', right: '0', top: '48px', bottom: '0', left: '0', zIndex: 1, backgroundColor: '#FFFFFFD0', paddingTop: '50%' }}>
        <Spin style={{ marginLeft: 'calc(50% - 24px)' }} tip="Se încarcă" size="large" />
    </div>
);

export default LoadingSpinner;