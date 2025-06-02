import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UpdateJobDto } from './dto/UpdateJob.dto';
import { CreateJobDto } from './dto/CreateJob.dto';

@Injectable()
export class JobsService {

    constructor(private prisma: PrismaService){}


    async create(data: CreateJobDto, userId: string) {
        return this.prisma.jobs.create({
            data: {
                ...data, 
                authorId: userId
            }
        })
    }

    async findAll() {
        return this.prisma.jobs.findMany()
    }

    async findOne(id: string) {
        return this.prisma.jobs.findUnique({ where: {id}})
    }

    async updateJob(id: string, data: UpdateJobDto, userId: string) {
        const job = await this.prisma.jobs.findUnique({where: {id}})
        if (!job) throw new NotFoundException("Job not found")
        if (job.authorId !== userId) throw new ForbiddenException("You are not allowed to update this job")

        await this.prisma.jobs.update({
            where: {id},
            data
        })
        return {message: "Job updated successfully"}
    }
    async deleteJob(id: string, userId: string) {
        const job = await this.prisma.jobs.findUnique({ where: {id} })
        if (!job) throw new NotFoundException('Job not found')
        if (job.authorId !== userId) throw new ForbiddenException("You are not allowed to delete this job")

        await this.prisma.jobs.delete({ where: {id} })
        return {message: "Job deleted successfully"}
    }
}
