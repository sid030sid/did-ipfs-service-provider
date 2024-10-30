import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinataSDK as PinataWeb3SDK } from "pinata-web3";
import { PinataSDK as PinataFileApiSDK } from "pinata";
import { DidDocResolution } from './interfaces/didDocResolution.interface';
import {createPublicKey, createPrivateKey, randomUUID} from 'crypto';

//import interfaces
import { Jwk } from './interfaces/jwk.interface';
import { DidDoc } from './interfaces/didDoc.interface';

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

  async uploadDidDocViaPinata(privateDidDoc: boolean, didDoc: DidDoc): Promise<string> {
    // create did:ipfs based on visibility level: public or private
    try{

      const filename = randomUUID() //create nonce to name file
      const file = new File([JSON.stringify(didDoc)], filename, { type: "text/plain" });

      let returnString : string;
      if(privateDidDoc === true){
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

  async resolveDid(did: string, privateDidDoc: boolean): Promise<DidDocResolution | string> {
    // get cid from did
    const cid = did.split(':')[2];

    // retrieve data from public or private ipfs via pinata
    let data;
    if(privateDidDoc === true){
      data = await this.downloadFromPrivateIpfsViaPinata(cid);
    }else{
      data = await this.downloadFromIpfsViaPinata(cid);
    }

    if(data === "error"){
      return "DID not found. Please check DID id and privacy status of DID";
    }else{

      // construct did document resolution
      const didDocResolution = {
        "@context": "https://w3id.org/did-resolution/v1",
        "didResolutionMetadata": {
          "contentType": "application/did+ld+json",
          "retrieved": new Date().toISOString(),
          "did": {
            "didString": "did:ipfs:"+cid,
            "methodSpecificId": cid,
            "method": "ipfs"
          }
        },
        "didDocument": JSON.parse(data.replaceAll("CID_PLACEHOLDER", cid))
      }
      
      return didDocResolution;
    }
  }

  bs64ToJwk(bs64key: string, keyType: string): Jwk {

    // convert bs64 encoded key to PEM
    const pem = `-----BEGIN ${keyType.toUpperCase()} KEY-----\n${bs64key.match(/.{1,64}/g).join('\n')}\n-----END ${keyType.toUpperCase()} KEY-----`;

    // convert PEM to JWK
    let key;
    let jwk;
    if (keyType.toUpperCase() === "PRIVATE") {
      key = createPrivateKey(pem);
      // Export JWK including the private key parameter (`d`)
      jwk = key.export({ format: "jwk" }); // This includes x, y, and d for EC keys
    } else {
      key = createPublicKey(pem);
      // Export JWK with only public components
      jwk = key.export({ format: "jwk" }); // This includes x and y for EC keys
    }
  
    // Set JWK properties
    jwk.kty = "EC";
    jwk.crv = "P-256"; 
  
    return jwk;
  }

  tagFile(base64FileString: string): string[] {
    //TODO in future: add pipe that validates the content of the file (= base64FileString) for training ML models
    return ["tag_1", "tag_2", "...", "tag_n"];
  }

  qeuryFile(base64FileString: string): string[]{
    //TODO in future: add pipe that makes the content of the file (= base64FileString) queryable
    return ["queryProperty_1", "queryProperty_2", "...", "queryProperty_n"];
  }

  //HELPER FUNCTIONS
  // uploding to IPFS following this guide: https://docs.pinata.cloud/quickstart-ipfs
  private async uploadToIpfsViaPinata(file : File): Promise<string> {
    try {
      const upload = await this.pinataIpfsApi.upload.file(file);
      return upload.IpfsHash;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // uploading to private IPFs powered by Pinata, following this guide: https://docs.pinata.cloud/quickstart-files
  private async uploadToPrivateIpfsViaPinata(file : File): Promise<string> {
    try {
      const upload = await this.pinataFileApi.upload.file(file);
      return upload.cid;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  private async downloadFromIpfsViaPinata(cid : string): Promise<string> {
    try {
      const res = await this.pinataIpfsApi.gateways.get(cid);
      return JSON.stringify(res.data);
    } catch (error) { 
      console.log(error);
      return "error";
    }
  }

  private async downloadFromPrivateIpfsViaPinata(cid : string): Promise<string> {
    try{
      const res = await this.pinataFileApi.gateways.get(cid);
      return JSON.stringify(res.data);
    }catch(error){
      console.log(error);
      return "error";
    }
  }
}
