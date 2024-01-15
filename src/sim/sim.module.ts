import {cd  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimController } from './sim.controller';
import { SimService } from './sim.service';
import { SimEntity } from './entities/sim.entity';
import {DiscountEntity} from "./entities/discount.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SimEntity, DiscountEntity])],
  controllers: [SimController],
  providers: [SimService],
  exports: [SimService],
})
export class SimModule {}
