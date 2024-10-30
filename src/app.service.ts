import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinataSDK as PinataWeb3SDK } from "pinata-web3";
import { PinataSDK as PinataFileApiSDK } from "pinata";

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
        console.log("upload public ipfs attempt")
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
    
    return data;
  }

  //HELPER FUNCTIONS
  // uploding to IPFS following this guide: https://docs.pinata.cloud/quickstart-ipfs
  private async uploadToIpfsViaPinata(file : string): Promise<string> {
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

  // uploading to private IPFs powered by Pinata, following this guide: https://docs.pinata.cloud/quickstart-files
  private async uploadToPrivateIpfsViaPinata(file : string): Promise<string> {
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

  private async downloadFromIpfsViaPinata(cid : string): Promise<string> {
    try {
      const data = await this.pinataIpfsApi.gateways.get(cid);
      return JSON.stringify(data);
    } catch (error) { 
      console.log(error);
      return error;
    }
  }

  private async downloadFromPrivateIpfsViaPinata(cid : string): Promise<string> {
    try{
      const data = await this.pinataFileApi.gateways.get(cid);
      return JSON.stringify(data);
    }catch(error){
      console.log(error);
      return error;
    }
  }
}
