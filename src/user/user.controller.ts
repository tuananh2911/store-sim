import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('login')
  async login(@Body() data: any) {
    if (data.username === 'adminkiet' && data.password === 'adminkiet') {
      return {
        message: 'Login success',
        isAdmin: true,
      };
    } else {
      return {
        message: 'Login failed',
        isAdmin: false,
      };
    }
  }
}
