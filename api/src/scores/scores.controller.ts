import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './scores.schema';
import { URoles } from 'src/users/users.schema';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Roles(URoles.admin)
  @Post()
  @ApiOperation({
    summary:
      'Create a score entry associated with a team for a specific challenge',
  })
  async create(@Body() createScoreDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.create(createScoreDto);
  }

  @Public()
  @ApiOperation({
    summary:
      'Create a score entry associated with a team for a specific challenge using challenge API Key',
  })
  @Post('verify')
  async setScoreViaKey(
    @Body() createScoreDto: CreateScoreDto,
    @Headers('Authorization') apiKey: string,
  ): Promise<Score> {
    console.log(apiKey);
    return this.scoresService.createViaApiKey(apiKey, createScoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scores entries' })
  async findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find score entry by id' })
  async findOne(@Param('id') id: string): Promise<Score> {
    return this.scoresService.findOne(id);
  }

  @Roles(URoles.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update score entry by id' })
  async update(
    @Param('id') id: string,
    @Body() updateScoreDto: UpdateScoreDto,
  ): Promise<Score> {
    return this.scoresService.update(id, updateScoreDto);
  }

  @Roles(URoles.admin)
  @ApiOperation({ summary: 'Delete score entry by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Score> {
    return this.scoresService.remove(id);
  }
}
