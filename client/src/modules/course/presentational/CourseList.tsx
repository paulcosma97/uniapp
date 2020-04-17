import React from "react";
import Course from "../../../shared/course/model/course.model";
import {Avatar, List, Skeleton} from "antd";

export interface CourseListProps {
    courses: Course[];
    onCourseClick: (course: Course) => any;
    onCourseDelete: (course: Course) => any;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, onCourseClick, onCourseDelete }) => (
    <List
        itemLayout="horizontal"
        dataSource={courses}
        loading={false}

        renderItem={course => (
            <List.Item onClick={() => onCourseClick(course)} actions={[<a href="#" onClick={event => {event.stopPropagation(); onCourseDelete(course)}} key="delete">șterge</a>]}>
                <Skeleton active loading={false}>
                    <List.Item.Meta
                        avatar={
                        <Avatar
                            style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}
                            size='large'
                        >{course.title
                            .split(' ')
                            .map(word => word[0])
                            .filter(letter => letter.toUpperCase() === letter)
                            .slice(0,4)
                            .join('')}</Avatar>
                        }
                        title={course.title}
                        description={<><span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Cod: </span>{course.code}</>}
                    />
                </Skeleton>
            </List.Item>
        )}
    />
);