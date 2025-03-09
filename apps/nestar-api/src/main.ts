import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 // express va nest jsni umumiy birlashmasi 
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
