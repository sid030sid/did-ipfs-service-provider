import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDidBodyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload the file ',
    required: true
  })
  file: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload Verifiable Presentation of your Personhood Credential.',
    required: false
  })
  personhoodCredential: any;
}