import { Injectable } from '@nestjs/common';


@Injectable()
export class UtilsService {
  getHello(): string {
    return 'Hello World!';
  }
}
