import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UtilsController } from './utils.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './utils.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController, UtilsController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
