import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';  // Import ConfigService
import { PinataSDK as PinataWeb3SDK } from "pinata-web3";
import { PinataSDK as PinataFileApiSDK } from "pinata";

/*
const pinataIpfsApi = new PinataWeb3SDK({
  pinataJwt: process.env.PINATA_API_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const pinataFileApi = new PinataFileApiSDK({
  pinataJwt: process.env.PINATA_API_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});
*/

@Injectable()
export class AppService {

  private pinataIpfsApi: PinataWeb3SDK;
  private pinataFileApi: PinataFileApiSDK;

  constructor(private configService: ConfigService) {
    // Initialize Pinata SDKs with env variables from ConfigService
    const pinataJwt = this.configService.get<string>('PINATA_API_JWT');
    const pinataGateway = this.configService.get<string>('PINATA_API_GATEWAY');

    this.pinataIpfsApi = new PinataWeb3SDK({
      pinataJwt,
      pinataGateway,
    });

    this.pinataFileApi = new PinataFileApiSDK({
      pinataJwt,
      pinataGateway,
    });
  }

  async createDid(privateDid:boolean, tagging, queryable, file): Promise<string> {
    // create did:ipfs based on visibility level: public or private
    try{
      let returnString : string;
      if(privateDid=true){
        console.log("upload private ipfs attempt")
        returnString = await this.uploadToPrivateIpfsViaPinata(file);
      }else{
        console.log("upload ipfs attempt")
        returnString= await this.uploadToIpfsViaPinata(file);
      }
      return returnString;
    }catch(error){
      console.log(error);
      return error;
    }
  }

  async resolveDid(did: string, privateDid: boolean): Promise<string> {
    // get cid from did
    const cid = did.split(':')[2];

    // retrieve data from public or private ipfs via pinata
    let data : string;
    if(privateDid=true){
      data = await this.downloadFromPrivateIpfsViaPinata(cid);
    }else{
      data = await this.downloadFromIpfsViaPinata(cid);
    }
    
    // if file not found, try private ipfs TODO: think about how the process of this looks like
    return data;
  }

  //HELPER FUNCTIONS
  //https://docs.pinata.cloud/quickstart-ipfs
  async uploadToIpfsViaPinata(file : string): Promise<string> {
    try {
      console.log("uploading to public ipfs")
      const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
      const upload = await this.pinataIpfsApi.upload.file(file);
      return JSON.stringify(upload);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //https://docs.pinata.cloud/quickstart-files
  async uploadToPrivateIpfsViaPinata(file : string): Promise<string> {
    try {
      console.log("uploading to private ipfs")
      const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
      const upload = await this.pinataFileApi.upload.file(file);
      return JSON.stringify(upload);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async downloadFromIpfsViaPinata(cid : string): Promise<string> {
    try {
      const data = await this.pinataIpfsApi.gateways.get(cid);
      return JSON.stringify(data);
    } catch (error) { 
      console.log(error);
      return error;
    }
  }

  async downloadFromPrivateIpfsViaPinata(cid : string): Promise<string> {
    try{
      const data = await this.pinataFileApi.gateways.get(cid);
      return JSON.stringify(data);
    }catch(error){
      console.log(error);
      return error;
    }
  }
}
