import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      console.error('JWT token is missing'); // Debugging log
      throw new UnauthorizedException('JWT token is missing');
    }

    try {
      // Verify and decode JWT token
      const decoded = this.jwtService.verify(token);
      console.log('Decoded JWT:', decoded); // Debugging log
      request.user = decoded; // Attach decoded user payload to `request.user`
      return true;
    } catch (error) {
      console.error('JWT Verification Error:', error.message); // Debugging log
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Extract JWT token from Authorization header
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Invalid Authorization Header:', authHeader); // Debugging log
      return null;
    }
    return authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  }
}
