import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Express } from 'express';
import { AppService } from './app.service';
import { PostCreateDidBodyDto } from './dtos/postCreateDidBody.dto';
import { PostCreateDidQueryDto } from './dtos/postCreateDidQuery.dto';

@ApiTags('Endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("createDid")
  @UseInterceptors(FileInterceptor('file')) //TODO: add pipe that validates the file for use case tagging
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PostCreateDidBodyDto })
  createDid(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: PostCreateDidQueryDto
  ): string {

    // construct did did document given query parameters tagging, queryable, and body content

    // create did:ipfs based on visibility level: public or private
    if(query.private){
      //this.appService.createDidPrivately(); TODO: construct did docment for uploaded file
    }else{
      //this.appService.createDid(); TODO 
    }
    return file.originalname;
  } 

  @Get("resolve/:did")
  getHello(@Param('did') did : string): string {
    return this.appService.resolveDid(did);
  }
}
