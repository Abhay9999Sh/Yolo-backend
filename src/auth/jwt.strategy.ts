import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extract JWT from Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Reject expired tokens

      // Dynamically provide the secret key from environment variables
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          return done(
            new UnauthorizedException('JWT_SECRET is not defined'),
            undefined,
          );
        }
        done(null, secret);
      },
    });
  }

  // Validate JWT payload and extract user data
  async validate(payload: any) {
    if (!payload || !payload._id) {
      throw new UnauthorizedException('Invalid token'); // 401 Unauthorized
    }
    return { userId: payload._id, username: payload.username };
  }
}
