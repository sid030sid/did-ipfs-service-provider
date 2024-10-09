import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  resolveDid(did: string): string {
    // get cid from did
    const cid = did.split(':')[2];

    // retrieve data from public ipfs
    // if file not found, try private ipfs TODO: think about how the process of this looks like
    return `Resolving DID ${did}`;
  }
}
