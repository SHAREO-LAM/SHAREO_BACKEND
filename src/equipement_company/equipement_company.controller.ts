import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
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

  /** Fonction utilitaire pour transformer l’entité en DTO front */
  private mapToReadDto(e: EquipementCompany): EquipementCompanyReadDto {
    return {
      equipementCompanyId: e.equipementCompanyId,
      displayName: e.displayName,
      description: e.description ?? undefined,
      pricePerDay: e.pricePerDay,
      stock: e.stock,
      companyId: e.companyId,
      equipementTypeId: e.equipementTypeId,
      datetimeCreate: e.datetimeCreate,
      datetimeUpdate: e.datetimeUpdate ?? undefined,
      userCreateId: e.userCreateId ?? undefined,
      userUpdateId: e.userUpdateId ?? undefined,
      equipementType: e.equipementType
        ? {
            id: e.equipementType.equipementTypeId ,
            name: e.equipementType.name ?? undefined,
            code: e.equipementType.code ?? undefined,
            equipementCategory: e.equipementType.equipementCategory
              ? {
                  id:
                    e.equipementType.equipementCategory.equipementCategoryId,
                  name: e.equipementType.equipementCategory.name ?? undefined,
                  code: e.equipementType.equipementCategory.code ?? undefined,
                  datetimeCreate: e.equipementType.equipementCategory.datetimeCreate,
                  datetimeUpdate:
                    e.equipementType.equipementCategory.datetimeUpdate ?? undefined,
                }
              : undefined,
          }
        : undefined,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Créer un équipement pour une société' })
  @ApiResponse({
    status: 201,
    description: 'Équipement créé.',
    type: EquipementCompanyReadDto,
  })
  async create(@Body() createEquipementCompanyDto: CreateEquipementCompanyDto) {
    const entity = await this.equipementCompanyService.create(createEquipementCompanyDto);
    return this.mapToReadDto(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les équipements des sociétés' })
  @ApiResponse({
    status: 200,
    description: 'Liste des équipements.',
    type: [EquipementCompanyReadDto],
  })
  async findAll(): Promise<EquipementCompanyReadDto[]> {
    const entities = await this.equipementCompanyService.findAll();
    return entities.map(this.mapToReadDto);
  }


@Get('company/:companyId')
@ApiOperation({ summary: 'Récupérer tous les équipements d’une company' })
@ApiParam({ name: 'companyId', description: 'ID de la company' })
@ApiResponse({
  status: 200,
  description: 'Liste des équipements pour la company',
  type: [EquipementCompanyReadDto],
})
async findByCompany(@Param('companyId') companyId: string): Promise<EquipementCompanyReadDto[]> {
  const entities = await this.equipementCompanyService.findByCompanyId(companyId);
  return entities.map(this.mapToReadDto);
}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un équipement par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Équipement trouvé.',
    type: EquipementCompanyReadDto,
  })
  async findOne(@Param('id') id: string): Promise<EquipementCompanyReadDto> {
    const entity = await this.equipementCompanyService.findOneById(+id);
    if (!entity) {
      throw new NotFoundException(`Équipement avec ID ${id} non trouvé`);
    }
    return this.mapToReadDto(entity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un équipement' })
  @ApiParam({ name: 'id', description: 'ID de l’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Équipement mis à jour.',
    type: EquipementCompanyReadDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateEquipementCompanyDto: UpdateEquipementCompanyDto,
  ): Promise<EquipementCompanyReadDto> {
    const entity = await this.equipementCompanyService.updateById(
      +id,
      updateEquipementCompanyDto,
    );
    return this.mapToReadDto(entity);
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
