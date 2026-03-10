import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(username: string, pass: string): Promise<any>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        userId: any;
        username: any;
    }>;
}
