import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(username: string, pass: string): Promise<any> {
        const existingUser = await this.userModel.findOne({ username }).exec();
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
        const createdUser = new this.userModel({ username, passwordHash: hashedPassword });
        await createdUser.save();
        return this.login(createdUser);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username }).exec();
        if (user && await bcrypt.compare(pass, user.passwordHash)) {
            const { passwordHash, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            userId: user._id,
            username: user.username,
        };
    }
}
