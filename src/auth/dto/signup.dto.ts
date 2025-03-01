import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'BirthDate is required' })
  birthDate: string;

  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  description?: string;
}
