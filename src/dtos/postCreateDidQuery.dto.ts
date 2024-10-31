import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDidQueryDto {
  @ApiProperty({
    description: 'If true, did:ipfs DID Document is privately stored using Pinata and its File API.',
    default: false
  })
  privateDidDoc: boolean;
  
  @ApiProperty({
    description: 'If true, file in did:ipfs DID Document is queryable through IPFS search engine.',
    required: false
  })
  queryable: boolean; //for use case of IPFS content based search engine 

  @ApiProperty({
    description: 'If true, file in did:ipfs DID Document is provided to data market of Machine Learning training data.',
    required: false
  })
  tagging: boolean; // for use case of tagging data for ML model training

  @ApiProperty({
    description: 'URL for proof submission for verifiability layer.',
    required: false
  })
  urlForProofSubmission: string; // for use case of verifiability layer for verifiable data replication
}