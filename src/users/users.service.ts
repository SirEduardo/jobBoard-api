import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UpdateUsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findAll(){
        return this.prisma.user.findMany()
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: {id} })
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: {email} })
    }

    async create(data: any) {
        return this.prisma.user.create({data})
    }


    async update(id: string, data: UpdateUsersDto, userId: string) {
        const user = await this.prisma.user.findUnique({ where: {id} })
        if (!user) throw new NotFoundException('User not found')
        if (user.id !== userId) throw new ForbiddenException("You arr not allowed to update this user")

        return this.prisma.user.update({
            where: {id},
            data,
        })
    }

    async delete(id: string) {
        const user = await this.prisma.user.findUnique({ where: {id} })
        if (!user) throw new NotFoundException('User not found')

        await this.prisma.user.delete({ where: {id} })
        return { message: "User deleted successfully" }
    }
}
