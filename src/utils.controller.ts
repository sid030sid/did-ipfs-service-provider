import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Express } from 'express';
import { UtilsService } from './utils.service';
import { PostCreateDidBodyDto } from './dtos/postCreateDidBody.dto';
import { PostCreateDidQueryDto } from './dtos/postCreateDidQuery.dto';

@ApiTags('utils')
@Controller()
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get("generateKey")
  async generateKey(): Promise<string> {
    return await "generate did:key for controller";
  }
}
