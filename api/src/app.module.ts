import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import * as Joi from 'joi';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PrismaExceptionFilter } from '@common/exception-filters';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { TokensModule } from '@tokens/tokens.module';
import { RolesModule } from '@roles/roles.module';
import { EmployeesModule } from '@employees/employees.module';
import { ClientsModule } from '@clients/clients.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { MailModule } from '@mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: process.env.NODE_ENV ? '.env.prod' : '.env',
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    TokensModule,
    RolesModule,
    EmployeesModule,
    ClientsModule,
    MailModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule {}
