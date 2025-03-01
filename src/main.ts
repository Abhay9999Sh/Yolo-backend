import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './common/filters/global-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorFilter());
  const PORT = process.env.PORT || 5000;

  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: allowedOrigin,
    credentials: true,
  });

  app.useGlobalFilters(new GlobalErrorFilter());

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
