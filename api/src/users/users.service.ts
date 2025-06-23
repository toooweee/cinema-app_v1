import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {}

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
    });
  }
}
