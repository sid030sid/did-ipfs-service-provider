import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiExcludeEndpoint} from '@nestjs/swagger';
import { FileInterceptor} from '@nestjs/platform-express';
import { Express, Response} from 'express';
import { AppService } from './app.service';
import { PostCreateDidBodyDto } from './dtos/postCreateDidBody.dto';
import { PostCreateDidQueryDto } from './dtos/postCreateDidQuery.dto';

@ApiTags('did:ipfs service endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiExcludeEndpoint() 
  getRoot(@Res() res: Response) {
    res.send("Please move to `http://localhost:3000/api` for interacting with did:ipfs service!");
  }

  @Post("createDidIpfs")
  @UseInterceptors(FileInterceptor('file')) //TODO in future: add pipe that validates the file for use case tagging
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PostCreateDidBodyDto })
  async createDid(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: PostCreateDidQueryDto
  ): Promise<string> {

    // convert 

    // construct did did document given query parameters tagging, queryable, and body content
    //TODO

    // create did:ipfs based on configurations stated in query
    const returnObj = await this.appService.createDid(query.private, query.tagging, query.queryable, file) 
    return returnObj;
  } 

  @Get("resolve/:didIpfs")
  async resolveDID(
    @Param('didIpfs') did : string,
    @Query('private') privateDid : boolean
  ): Promise<string> {
    return await this.appService.resolveDid(did, privateDid);
  }
}
