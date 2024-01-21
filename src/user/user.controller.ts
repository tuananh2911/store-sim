import { Body, Controller, Post } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private jwtService: JwtService) {}
  @Post('login')
  async login(@Body() data: any) {
    if (data.username === 'adminkiet' && data.password === 'adminkiet') {
      const payload = { user: 'adminkiet', pass: 'adminkiet' };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      return {
        message: 'Login failed',
        isAdmin: false,
      };
    }
  }
}
