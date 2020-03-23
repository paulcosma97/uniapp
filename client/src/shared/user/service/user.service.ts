import User, {ShortUser, UserCredentials, UserRole} from "../model/user.model";
import {MockService} from "../../mock/mock.service";


export interface UserService {
    load(): Promise<User>;
    login(credentials: UserCredentials): Promise<User>;
    register(user: ShortUser): Promise<User>;
}

interface CompleteUser extends User, UserCredentials {}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export class MockUserService implements UserService {
    private readonly mockService = new MockService<CompleteUser>('users');

    async load(): Promise<User> {
        const email = localStorage.getItem('loggedUser');
        if (!email) {
            throw new Error('Visitor is not authenticated.')
        }

        return this.mockService.find({ email });
    }

    async login(credentials: UserCredentials): Promise<User> {
        await delay(300);
        const found = this.mockService.find(credentials);
        localStorage.setItem('loggedUser', found.email);
        return found;
    }

    async register(user: ShortUser & UserCredentials): Promise<User> {
        await delay(300);

        this.mockService.save({
            ...user,
            role: UserRole.STUDENT,
            id: (undefined as any as number)
        });

        return this.login({ email: user.email, password: user.password });
    }
}

export const userService: UserService = new MockUserService();