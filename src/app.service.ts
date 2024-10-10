import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createDid(): string {
    return 'Creating DID';
  }

  resolveDid(did: string): string {
    // get cid from did
    const cid = did.split(':')[2];

    // retrieve data from public ipfs
    // if file not found, try private ipfs TODO: think about how the process of this looks like
    return `Resolving DID ${did}`;
  }

  //HELPER FUNCTIONS
  //https://docs.pinata.cloud/quickstart-ipfs
  uploadToIpfsViaPinata(file : string): string {
    return 'Uploading to IPFS';
  }

  //https://docs.pinata.cloud/quickstart-files
  uploadToPrivateIpfsViaPinata(file : string): string {
    return 'Uploading to private IPFS';
  }

  downloadFromIpfsViaPinata(cid : string): string {
    return 'Downloading from IPFS';
  }

  downloadFromPrivateIpfsViaPinata(cid : string): string {
    return 'Downloading from private IPFS';
  }
}
