import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './challenges.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a challenge' })
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengesService.create(createChallengeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all challenges' })
  async findAll(): Promise<Challenge[]> {
    return await this.challengesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find challenge by id' })
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return await this.challengesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update challenge by id' })
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengesService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete challenge by id' })
  async remove(@Param('id') id: string): Promise<Challenge> {
    return await this.challengesService.remove(id);
  }
}
