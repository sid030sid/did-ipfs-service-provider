import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Express } from 'express';
import { AppService } from './app.service';
import { PostCreateDidBodyDto } from './dtos/postCreateDidBody.dto';
import { PostCreateDidQueryDto } from './dtos/postCreateDidQuery.dto';

@ApiTags('did:ipfs service endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("createDid")
  @UseInterceptors(FileInterceptor('file')) //TODO: add pipe that validates the file for use case tagging
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PostCreateDidBodyDto })
  async createDid(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: PostCreateDidQueryDto
  ): Promise<string> {

    // construct did did document given query parameters tagging, queryable, and body content
    //TODO

    // create did:ipfs based on configurations stated in query
    const returnObj = await this.appService.createDid(query.private, query.tagging, query.queryable, file) 
    return returnObj;
  } 

  @Get("resolve/:did")
  async resolveDID(
    @Param('did') did : string,
    @Query('private') privateDid : boolean
  ): Promise<string> {
    return await this.appService.resolveDid(did, privateDid);
  }
}
