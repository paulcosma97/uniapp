import React from "react";
import {Progress} from "antd";

export interface AttendanceProgressProps {
    current: number;
    total: number;
}

const AttendanceProgress: React.FC<AttendanceProgressProps> = ({ current, total }) => (
    <div className="align-center">
        <Progress
            type="circle"
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
            }}
            percent={Math.floor(current / total * 10000) / 100}
            format={() => current + ' / ' + total}
        />
    </div>
);

export default AttendanceProgress;