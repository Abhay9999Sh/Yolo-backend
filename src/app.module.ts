import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/db.config';
import { JwtConfig } from './config/jwt.config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfig,
    JwtConfig,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
