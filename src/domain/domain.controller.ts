import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain } from '../entities/entities/Domain';
import { AvailabilityService } from './availability.service';

@ApiTags('Domains')
@Controller('domain')
export class DomainController {
  constructor(
    private readonly domainService: DomainService,
    private readonly availabilityService: AvailabilityService,
  ) { }

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

  @Get(':id/unavailable-dates')
  @ApiOperation({
    summary: 'Récupérer toutes les dates non disponibles pour un domaine',
  })
  @ApiParam({ name: 'id', description: 'ID du domaine', type: Number })
  @ApiResponse({ status: 200, description: 'Liste des dates non disponibles' })
  @ApiResponse({ status: 404, description: 'Domaine non trouvé' })
  async getUnavailableDates(@Param('id') id: number) {
    const disabledDates =
      await this.availabilityService.getUnavailableDates(id);
    return { disabledDates };
  }

  @Get(':id/check-availability')
  @ApiOperation({
    summary: 'Vérifier la disponibilité d’un domaine sur une période donnée',
  })
  @ApiParam({ name: 'id', description: 'ID du domaine', type: Number })
  @ApiQuery({
    name: 'startDate',
    description: 'Date de début (YYYY-MM-DD)',
    required: true,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'Date de fin (YYYY-MM-DD)',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Disponibilité vérifiée',
    schema: { example: { available: true } },
  })
  @ApiResponse({
    status: 404,
    description: 'Domaine non trouvé ou paramètres invalides',
  })
  async checkAvailability(
    @Param('id') id: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const isAvailable = await this.availabilityService.checkDomainAvailability(
      id,
      startDate,
      endDate,
    );

    return { available: isAvailable };
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Récupérer tous les domaines d’une company' })
  @ApiParam({ name: 'companyId', description: 'ID de la company' })
  @ApiResponse({ status: 200, description: 'Liste des domaines', type: [Domain] })
  async findByCompany(@Param('companyId') companyId: string): Promise<Domain[]> {
    return this.domainService.findByCompanyId(companyId);
  }
}
