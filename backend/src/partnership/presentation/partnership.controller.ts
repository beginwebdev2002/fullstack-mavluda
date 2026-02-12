import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartnershipService } from '../application/partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';

@Controller('partnerships')
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Post()
  create(@Body() createPartnershipDto: CreatePartnershipDto) {
    return this.partnershipService.create(createPartnershipDto);
  }

  @Get()
  findAll() {
    return this.partnershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnershipService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnershipDto: UpdatePartnershipDto) {
    return this.partnershipService.update(id, updatePartnershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnershipService.remove(id);
  }
}
