import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateApplicationDto } from './dto/createApplications.dto';

@Injectable()
export class ApplicationsService {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateApplicationDto, userId: string) {
        const existing = await this.prismaService.application.findUnique({
            where: {
                jobId_userId: {
                    jobId: dto.jobId,
                    userId
                }
            }
        })
        if (existing) throw new ForbiddenException("You already applied to this job")
        
        return this.prismaService.application.create({
            data: {
                ...dto,
                userId
            }
        })
    }

    async findMyApplication(userId: string) {
        return this.prismaService.application.findMany({
            where: { userId },
            include: { job: true }
        })
    }
    
    async remove(id: string, userId: string) {
        const app = await this.prismaService.application.findUnique({ where: {id} })

        if (!app) throw new NotFoundException("Application not found")

        if (userId !== app.userId) throw new ForbiddenException("No authorized")
        
        await this.prismaService.application.delete({ where: {id} })
        return {message: "apply deleted"}
    }
}
