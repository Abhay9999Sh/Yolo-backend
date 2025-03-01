import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule], // Load environment variables from ConfigModule
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URL'),
  }),
});
