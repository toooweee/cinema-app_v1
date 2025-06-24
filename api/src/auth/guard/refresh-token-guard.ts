import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { refreshTokenKey } from '@tokens/types/refresh-token-key';
import { TokensService } from '@tokens/tokens.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('are we there');
    const request: Request = context.switchToHttp().getRequest();
    const refreshToken = this.extractTokenFromCookies(request);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    if (!(await this.tokensService.validateRefreshToken(refreshToken))) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const refreshToken: unknown = request.cookies?.[refreshTokenKey];

    return typeof refreshToken === 'string' ? refreshToken : undefined;
  }
}
