import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDidQueryDto {
  @ApiProperty({
    description: 'If true, did:ipfs DID Document is privately stored using Pinata and its File API.',
    default: false
  })
  privateDidDoc: boolean;
  
  @ApiProperty({
    description: 'If true, file in did:ipfs DID Document can be queried through IPFS search engine.',
    required: false
  })
  queryable: boolean; //for use case of IPFS content based search engine 

  @ApiProperty({
    description: 'If true, file in did:ipfs DID Document is tagged for efficient Machine Learning training.',
    required: false
  })
  tagging: boolean; // for use case of tagging data for ML model training

  @ApiProperty({
    description: 'URL for receiving proofs by IPFS node operators.',
    required: false
  })
  urlForProofSubmission: string; // for use case of verifiability layer for verifiable data replication
}