import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('did:ipfs Service Provider')
    .setDescription('With this UI did:ipfs operations can be performed. Read the documentation [here](https://github.com/sid030sid/did-ipfs-service-provider?tab=readme-ov-file#didipfs-service-provider).')
    .setVersion('1.0')
    .addTag('did:ipfs operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'api', 
    app, 
    document, 
    {swaggerOptions: 
      { defaultModelsExpandDepth: -1 } //to hide schemas in swagger ui
    }
  );

  await app.listen(3000);
}
bootstrap();