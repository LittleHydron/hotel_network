import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept"
  });

  await app.listen(2700);
  console.log('Server is running on http://localhost:2700');
}

bootstrap();
