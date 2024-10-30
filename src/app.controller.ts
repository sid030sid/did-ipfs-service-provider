import { Controller, Get, Param, Post, Query, Body, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiExcludeEndpoint} from '@nestjs/swagger';
import { FileInterceptor} from '@nestjs/platform-express';
import { Express, Response} from 'express';
import { AppService } from './app.service';
import { PostCreateDidBodyDto } from './dtos/postCreateDidBody.dto';
import { PostCreateDidQueryDto } from './dtos/postCreateDidQuery.dto';
import { DidDocResolution } from './interfaces/didDocResolution.interface';
import { generateKeyPairSync } from 'crypto';
import { Jwk } from './interfaces/jwk.interface';
import { writeFileSync, readFileSync, existsSync } from 'fs';


@ApiTags('did:ipfs service endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiExcludeEndpoint() 
  getRoot(@Res() res: Response) {
    res.send("<h1>Please move to <a href=http://localhost:3000/api>http://localhost:3000/api</a> for interacting with did:ipfs service!</h1>");
  }

  @Post("createDidIpfs")
  @UseInterceptors(FileInterceptor('file')) //TODO in future: add pipe that validates the file for use case tagging
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PostCreateDidBodyDto })
  async createDid(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: PostCreateDidQueryDto
  ): Promise<string> {

    // get query parameters
    const { privateDidDoc, tagging, queryable } = query;

    // convert file
    const base64FileString = file.buffer.toString('base64');

    // tag the file, if tagging is set to true
    let tags = []
    if(tagging){
      tags = this.appService.tagFile(base64FileString);
    }

    // if queryable is set to true, make the file queryable
    let queryProperties = []
    if(queryable){
      queryProperties = this.appService.qeuryFile(base64FileString);
    }

    // generate private and public key for DID subject+
    const { publicKey, privateKey } = generateKeyPairSync('ec', {
      namedCurve: 'prime256v1', 
      publicKeyEncoding: {
        type: 'spki',
        format: 'der'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der'
      }
    });
    
    // generate JWK for DID Subject's public key
    const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
    const jwk : Jwk = this.appService.bs64ToJwk(publicKeyBase64, "public");

    // construct did document given query parameters tagging, queryable, and body content
    const didDocument = {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://identity.foundation/.well-known/did-configuration/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "did:ipfs:CID_PLACEHOLDER",
        "controller": [
          process.env.DID
        ],
        "verificationMethod": [
            {
            "id": "did:ipfs:CID_PLACEHOLDER#key-1",
            "type": "JasonWebKey2020",
            "controller": "did:ipfs:CID_PLACEHOLDER",
            "publicKeyJwk": jwk
            }
        ],
        "authentication": [
            "did:ipfs:CID_PLACEHOLDER#key-1"
        ],
        "service": [
            {
            "id": "did:ipfs:CID_PLACEHOLDER#tags",
            "type": "LinkedTags",
            "serviceEndpoint": tags
            },
            {
                "id": "did:ipfs:CID_PLACEHOLDER#queryProperties",
                "type": "LinkedQueryProperties",
                "serviceEndpoint": queryProperties
            },
        ],
        "file": base64FileString //TODO in future: allow multiple files
    }

    // create did:ipfs based on configurations stated in query
    const returnObj = await this.appService.uploadDidDocViaPinata(privateDidDoc, didDocument) 
    console.log(returnObj);

    // get cid
    const cid: string = "cid"

    // store private key in local cid-key database for better UX
    const db = JSON.parse(readFileSync("./cid-key-database.json", 'utf-8'));
    db.push({cid: cid, publicKey: publicKeyBase64, privateKey: Buffer.from(privateKey).toString('base64')});
    writeFileSync("./cid-key-database.json", JSON.stringify(db, null, 2), 'utf-8');

    // return did:ipfs
    return "did:ipfs:"+cid;
  } 

  @Get("resolve/:didIpfs")
  async resolveDID(
    @Param('didIpfs') did : string,
    @Query('private') privateDidDoc : boolean
  ): Promise<DidDocResolution> {
    return await this.appService.resolveDid(did, privateDidDoc);
  }
}
