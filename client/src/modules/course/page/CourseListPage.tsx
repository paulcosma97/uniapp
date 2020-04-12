import React from "react";
import Layout from "../../../shared/components/layout/Layout";
import {CourseListContainer} from "../container/CourseListContainer";

const CourseListPage: React.FC = () => (
    <Layout>
        <CourseListContainer />
    </Layout>
);

export default CourseListPage;