import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './common/filters/global-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorFilter());
  const PORT = process.env.PORT || 5000;

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalFilters(new GlobalErrorFilter());

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
