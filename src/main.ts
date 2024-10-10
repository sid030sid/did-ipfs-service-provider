import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('did:ipfs Service Provider')
    .setDescription('This UI lets you interact with the did:ipfs service provider.')
    .setVersion('1.0')
    .addTag('did:ipfs service endpoints')
    .addTag('utils')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();