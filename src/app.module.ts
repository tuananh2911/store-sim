import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { SimModule } from './sim/sim.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'tuananh',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        PGHOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        PGUSER: Joi.string().required(),
        PGPASSWORD: Joi.string().required(),
        PGDATABASE: Joi.string().required(),
        PORT: Joi.number(),
        ENDPOINT_ID: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    SimModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
