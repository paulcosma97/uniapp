import React from "react";
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons/lib";

const DidAttendIcon: any = SmileOutlined;
const DidNotAttendIcon: any = FrownOutlined;
const CanStillAttendIcon: any = MehOutlined;

const AttendanceIcon: React.FC<{ didAttend?: boolean; available?: boolean }> = ({ didAttend, available }) => {
    if (didAttend) {
        return <DidAttendIcon style={{ fontSize: '1.5em', color: '#3CB371' }} />;
    }

    if (available) {
        return <CanStillAttendIcon style={{ fontSize: '1.5em', color: '#a0a0a0' }} />
    }

    return <DidNotAttendIcon style={{ fontSize: '1.5em', color: '#FF6347' }} />;
};

export default AttendanceIcon;