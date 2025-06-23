import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AuthDto } from '@auth/dto';
import { UsersService } from '@users/users.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: AuthDto) {
    const { email, password } = registerDto;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await argon.hash(password);

    const user = await this.prismaService.user;
  }

  async login(loginDto: AuthDto) {}
}
