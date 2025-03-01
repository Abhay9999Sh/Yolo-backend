import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Endpoint for user signup
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  // Endpoint for user login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      console.log('Login attempt:', loginDto.username);
      return await this.authService.login(loginDto);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error('Login failed');
    }
  }

  // Endpoint to get the current user's profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    return {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
  }
  // Endpoint for user logout
  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
