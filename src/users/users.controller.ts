import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/guard';
import { UpdateUsersDto } from './dto/users.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles('ADMIN')
    getUsers(){
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/:id')
    getProfile(@Param("id") id: string) {    
        return this.usersService.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile/:id')
    updateProfile(@Req() req, @Body() dto: UpdateUsersDto, @Param() id: string) {
        return this.usersService.update(req.user.userId, dto, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    deleteProfile(@Req() req) {
        return this.usersService.delete(req.user.userId)
    }
}
