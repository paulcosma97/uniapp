import User, {ShortUser, UserCredentials, UserRole} from "../model/user.model";
import {MockService} from "../../mock/mock.service";


export interface UserService {
    load(): Promise<User>;
    login(credentials: UserCredentials): Promise<User>;
    register(user: ShortUser): Promise<void>;
    logout(): Promise<void>;
}

interface CompleteUser extends User, UserCredentials {}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export class MockUserService implements UserService {
    private readonly mockService = new MockService<CompleteUser>('users');

     load = async (): Promise<User> => {
         await delay(500);

         const email = localStorage.getItem('loggedUser');
        if (!email) {
            throw new Error('Visitor is not authenticated.')
        }

        return this.mockService.find({ email });
    };

    login = async (credentials: UserCredentials): Promise<User> => {
        await delay(500);
        const found = this.mockService.find(credentials);
        localStorage.setItem('loggedUser', found.email);
        return found;
    };

    register = async (user: ShortUser & UserCredentials): Promise<void> => {
        await delay(500);

        this.mockService.save({
            ...user,
            role: UserRole.STUDENT,
            id: (undefined as any as number)
        });
    };

    logout = async (): Promise<void> => {
        await delay(500);
        localStorage.removeItem('loggedUser');
    }
}

export const userService: UserService = new MockUserService();