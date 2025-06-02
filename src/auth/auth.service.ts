import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new UnauthorizedException("Invalid credentials")

        return user
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role }
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }

    async register(data: RegisterDto){
        try {
        const hashed = await bcrypt.hash(data.password, 10)
        const newUser = await this.usersService.create({ ...data, password: hashed })

        return this.login(newUser)
        } catch (err) {
         if (err.code === 'P2002') {
      throw new ConflictException('Email already registered');
    }
    throw err;
  }
    }
}
