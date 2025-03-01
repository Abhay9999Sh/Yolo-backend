import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // User Signup: Registers a new user after checking for existing username/email
  async signup(signupDto: SignupDto) {
    const existingUser = await this.userModel.findOne({
      $or: [{ username: signupDto.username }, { email: signupDto.email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or Email already exists'); // 409 Conflict
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = new this.userModel({ ...signupDto, password: hashedPassword });
    await user.save();

    return { message: 'User registered successfully' };
  }

  // User Login: Authenticates a user and returns a JWT token
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({
        username: loginDto.username,
      });

      if (!user) {
        throw new UnauthorizedException('User not found'); // 401 Unauthorized
      }

      // Verify if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials'); // 401 Unauthorized
      }

      // Generate a JWT token for authentication
      const token = this.jwtService.sign({
        _id: user._id,
        username: user.username,
      });

      return { token };
    } catch (error) {
      console.error('Login error:', error.message); // Log the actual error
      throw new Error('Login failed. Please check your credentials.');
    }
  }
}
