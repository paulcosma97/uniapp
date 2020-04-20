import Course, {CourseDetails} from "../model/course.model";
import axios from 'axios';


export class CourseService {
    loadAll = (): Promise<Course[]> => axios.get<Course[]>('/api/courses').then(res => res.data);
    load = (id: number): Promise<CourseDetails> => axios.get<CourseDetails>('/api/courses/' + id).then(res => res.data);
    enlist = (code: string): Promise<Course> => axios.put<Course>('/api/courses/students', { code }).then(res => res.data);
    delist = (id: number, student: number): Promise<void> => axios.delete<void>(`/api/courses/${id}/students/${student}`).then(res => res.data);
    create = (title: string): Promise<Course> => axios.post<Course>('/api/courses', { title }).then(res => res.data);
    remove = (id: number): Promise<void> => axios.delete<void>('/api/courses/' + id).then(res => res.data);
}

export const courseService = new CourseService();