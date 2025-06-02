import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @Post("register")
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post("login")
    async login(@Body() dto: loginDto) {
        return this.authService.validateUser(dto.email, dto.password).then(user => 
            this.authService.login(user)
        )
    }

}
