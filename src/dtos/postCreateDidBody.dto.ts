import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDidBodyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload the file ',
    required: true
  })
  file: any;
}