import { SimService } from './sim.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SimDto } from './dto/sim.dto';
import { BuySimDto } from './dto/buy-sim.dto';
import { DataSimUploadDto } from './dto/data-sim-upload.dto';
import {AuthGuard} from "../auth/auth.guard";


@Controller('sims')
export class SimController {
  constructor(private readonly simService: SimService) {}

  @Post()
  async getAll(@Body() query: SimDto) {
    return this.simService.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.simService.getOne(id);
  }

  @Post(':id/buy')
  async buy(@Param('id') id: number, @Body() dataToBuy: BuySimDto) {
    return this.simService.buy(id, dataToBuy);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  async uploadSims(@Body() data: DataSimUploadDto) {
    return this.simService.uploadSims(data);
  }
}
