import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { PrismaModule } from 'src/config/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
