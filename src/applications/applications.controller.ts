import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/createApplications.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('applications')
export class ApplicationsController {
    constructor(private applicationService: ApplicationsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles("CANDIDATE")
    apply(@Body() dto: CreateApplicationDto, @Req() req) {
        const user = req.user.id
        return this.applicationService.create(dto, user)
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    myApplications(@Req() req) {
        const user = req.user.id
        return this.applicationService.findMyApplication(user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param("id") id: string, @Req() req) {
        const user = req.user.id
        return this.applicationService.remove(id, user)
    }
}
