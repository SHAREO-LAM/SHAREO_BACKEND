import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain } from '../entities/entities/Domain';

@ApiTags('Domains')
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un domaine' })
  @ApiResponse({ status: 201, description: 'Domaine créé.', type: Domain })
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les domaines' })
  @ApiResponse({
    status: 200,
    description: 'Liste des domaines.',
    type: [Domain],
  })
  findAll() {
    return this.domainService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un domaine par ID' })
  @ApiParam({ name: 'id', description: 'ID du domaine' })
  @ApiResponse({ status: 200, description: 'Domaine trouvé.', type: Domain })
  findOne(@Param('id') id: string) {
    return this.domainService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un domaine' })
  @ApiParam({ name: 'id', description: 'ID du domaine' })
  @ApiResponse({
    status: 200,
    description: 'Domaine mis à jour.',
    type: Domain,
  })
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.updateById(+id, updateDomainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un domaine' })
  @ApiParam({ name: 'id', description: 'ID du domaine' })
  @ApiResponse({ status: 200, description: 'Domaine supprimé.' })
  remove(@Param('id') id: string) {
    return this.domainService.removeById(+id);
  }
}
