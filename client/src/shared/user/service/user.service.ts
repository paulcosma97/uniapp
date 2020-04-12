import User, {ShortUser, UserCredentials} from "../model/user.model";
import axios from 'axios';

export class UserService {
    load = (): Promise<User> =>
        axios.get<User>('/users/profile').then(res => res.data);

    login = (credentials: UserCredentials): Promise<User> =>
        axios.post<User>('/users/login', credentials).then(res => res.data);

    register = (user: ShortUser & UserCredentials): Promise<void> =>
        axios.post<void>('/users', user).then(res => res.data);

    logout = (): Promise<void> =>
        axios.post<void>('/users/logout').then(res => res.data);
}

export const userService = new UserService();