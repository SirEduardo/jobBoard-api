import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from 'src/auth/guards/guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateJobDto } from './dto/CreateJob.dto';
import { UpdateJobDto } from './dto/UpdateJob.dto';

@Controller('jobs')
export class JobsController {

    constructor(private jobsService: JobsService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles("RECRUITER")
    createJob(@Body() dto: CreateJobDto, @Req() req){
        const userId = req.user.id
        return this.jobsService.create(dto, userId)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllJobs() {
        return this.jobsService.findAll()
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(":id")
    getJobById(@Param("id") id: string){
        return this.jobsService.findOne(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(":id")
    @Roles("RECRUITER")
    updateJob(@Param("id") id: string, @Body() dto: UpdateJobDto, @Req() req){
        const userId = req.user.id
        return this.jobsService.updateJob(id, dto, userId)
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    @Roles("RECRUITER") 
    deleteJob(@Param("id") id: string, @Req() req) {
        const userId = req.user.id
        return this.jobsService.deleteJob(id, userId)
    }

    
}
