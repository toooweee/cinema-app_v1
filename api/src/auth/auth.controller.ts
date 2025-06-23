import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '@auth/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary:
      'Register. Sets refresh_token to cookies and give you access token',
  })
  async register(@Body() registerDto: AuthDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login. Sets refresh_token to cookies and give you access token',
  })
  async login(@Body() loginDto: AuthDto) {
    return loginDto;
  }
}
