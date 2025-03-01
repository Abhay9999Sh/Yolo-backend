import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    console.log('User ID from Token:', req.user._id); 
    return this.userService.getUserById(req.user._id); 
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    console.log('User ID from Token:', req.user._id);
    console.log('Update Data:', updateProfileDto); 
    return this.userService.updateProfile(req.user._id, updateProfileDto);
  }
}
