import { Module } from '@nestjs/common';
import { EmailService } from './service/email.service';
import { EmailController } from './controller/email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
