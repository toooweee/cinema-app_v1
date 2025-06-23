import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AuthDto } from '@auth/dto';
import { UsersService } from '@users/users.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { RolesService } from '@roles/roles.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
  ) {}

  async register(registerDto: AuthDto) {
    const { email, password } = registerDto;

    const existingUser = await this.usersService.findOne({ email });

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const hashedPassword = await argon.hash(password);
    const activationLink =
      this.configService.get<string>('API_URL') + `/${uuid.v4()}`;
    const role = await this.rolesService.findOne({
      name: 'Client',
    });

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        activationLink,
        client: {
          create: {
            roleId: role.id,
          },
        },
      },
    });

    return user;
  }

  async login(loginDto: AuthDto) {}
}
