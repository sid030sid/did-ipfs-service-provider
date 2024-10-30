import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './utils.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
