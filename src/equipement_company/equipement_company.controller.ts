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
import { EquipementCompanyService } from './equipement_company.service';
import { CreateEquipementCompanyDto } from './dto/create-equipement_company.dto';
import { UpdateEquipementCompanyDto } from './dto/update-equipement_company.dto';
import { EquipementCompany } from '../entities/entities/EquipementCompany';
import { EquipementCompanyReadDto } from './dto/read-equipement-company.dto';
import { AvailabilityService } from './availability.service';

@ApiTags('Equipement companies')
@Controller('equipement-company')
export class EquipementCompanyController {
  constructor(
    private readonly equipementCompanyService: EquipementCompanyService,
    private readonly availabilityService: AvailabilityService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer un équipement pour une société' })
  @ApiResponse({
    status: 201,
    description: 'Équipement créé.',
    type: EquipementCompany,
  })
  create(@Body() createEquipementCompanyDto: CreateEquipementCompanyDto) {
    return this.equipementCompanyService.create(createEquipementCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les équipements des sociétés' })
  @ApiResponse({
    status: 200,
    description: 'Liste des équipements.',
    type: [EquipementCompanyReadDto],
  })
  findAll() {
    return this.equipementCompanyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un équipement par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Équipement trouvé.',
    type: EquipementCompanyReadDto,
  })
  findOne(@Param('id') id: string) {
    return this.equipementCompanyService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un équipement' })
  @ApiParam({ name: 'id', description: 'ID de l’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Équipement mis à jour.',
    type: EquipementCompany,
  })
  update(
    @Param('id') id: string,
    @Body() updateEquipementCompanyDto: UpdateEquipementCompanyDto,
  ) {
    return this.equipementCompanyService.updateById(
      +id,
      updateEquipementCompanyDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un équipement' })
  @ApiParam({ name: 'id', description: 'ID de l’équipement' })
  @ApiResponse({ status: 200, description: 'Équipement supprimé.' })
  remove(@Param('id') id: string) {
    return this.equipementCompanyService.removeById(+id);
  }

  @Get(':id/unavailable-dates')
  @ApiOperation({
    summary: 'Récupérer toutes les dates non disponibles pour un équipement',
  })
  @ApiParam({ name: 'id', description: 'ID de l’équipement', type: Number })
  @ApiResponse({ status: 200, description: 'Liste des dates non disponibles' })
  @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
  async getUnavailableDates(@Param('id') id: number) {
    const disabledDates =
      await this.availabilityService.getUnavailableDatesForEquipment(id);
    return { disabledDates };
  }

  @Get(':id/check-availability')
  @ApiOperation({
    summary:
      'Vérifier la disponibilité d’un équipement sur une période et une quantité données',
  })
  @ApiParam({ name: 'id', description: 'ID de l’équipement', type: Number })
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
  @ApiQuery({
    name: 'quantity',
    description: 'Quantité demandée',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Disponibilité vérifiée avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Paramètres invalides ou indisponibilité',
  })
  async checkAvailability(
    @Param('id') id: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('quantity') quantity: string,
  ) {
    const qty = parseInt(quantity, 10);
    const isAvailable =
      await this.availabilityService.checkEquipmentAvailability(
        id,
        startDate,
        endDate,
        qty,
      );
    return { available: isAvailable };
  }
}
