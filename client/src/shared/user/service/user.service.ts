import User, {ShortUser, UserCredentials, UserRole} from "../model/user.model";
import axios from 'axios';


export interface UserService {
    load(): Promise<User>;
    login(credentials: UserCredentials): Promise<User>;
    register(user: ShortUser): Promise<void>;
    logout(): Promise<void>;
}

export class MockUserService implements UserService {

     load = async (): Promise<User> => {
         // return fetch('http://localhost:4000/users/profile', {
         //     method: 'get',
         //     credentials: 'include'
         // }).then(res => res.json()) as Promise<User>;
         return axios.get<User>('/users/profile')
             .then(res => res.data);
    };

    login = async (credentials: UserCredentials): Promise<User> => {
        return axios.post<User>('/users/login', credentials).then(res => res.data);
    };

    register = async (user: ShortUser & UserCredentials): Promise<void> => {
        await axios.post<void>('/users', {
            ...user,
            role: UserRole.STUDENT
        });
    };

    logout = async (): Promise<void> => {
        await axios.post<void>('/users/logout');
    }
}

export const userService: UserService = new MockUserService();