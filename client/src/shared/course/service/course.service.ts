import Course, {CourseDetails} from "../model/course.model";
import axios from 'axios';


export class CourseService {
    loadAll = (): Promise<Course[]> => axios.get<Course[]>('/courses').then(res => res.data);
    load = (id: number): Promise<CourseDetails> => axios.get<CourseDetails>('/courses/' + id).then(res => res.data);
}

export const courseService = new CourseService();