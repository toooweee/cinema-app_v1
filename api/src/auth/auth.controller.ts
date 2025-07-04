import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '@auth/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { refreshTokenKey } from '@tokens/types/refresh-token-key';
import { Public } from '@auth/decorators';
import { Cookies, CurrentUser } from '@common/decorators';
import { RequestUser } from '@auth/types';
import { RefreshTokenGuard } from '@auth/guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary:
      'Register. Sets refresh_token to cookies and give you access token',
  })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: AuthDto,
  ) {
    const tokens = await this.authService.register(registerDto);
    this.setTokenToCookies(tokens.refreshToken, res);
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login. Sets refresh_token to cookies and give you access token',
  })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: AuthDto,
  ) {
    const tokens = await this.authService.login(loginDto);
    this.setTokenToCookies(tokens.refreshToken, res);
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: 'Refresh tokens',
  })
  async refresh(
    @Cookies(refreshTokenKey) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const tokens = await this.authService.refreshTokens(refreshToken);
    this.setTokenToCookies(tokens.refreshToken, res);
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Logout. Clear cookies and delete token from db',
  })
  async logout(
    @Cookies(refreshTokenKey) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie(refreshTokenKey, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: Date.now(),
    });
    await this.authService.logout(refreshToken);
    return HttpStatus.OK;
  }

  private setTokenToCookies(token: string, res: Response) {
    res.cookie(refreshTokenKey, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  }
}
