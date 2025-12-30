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
import { EquipementCompanyService } from './equipement_company.service';
import { CreateEquipementCompanyDto } from './dto/create-equipement_company.dto';
import { UpdateEquipementCompanyDto } from './dto/update-equipement_company.dto';
import { EquipementCompany } from '../entities/entities/EquipementCompany';

@ApiTags('Equipement companies')
@Controller('equipement-company')
export class EquipementCompanyController {
  constructor(
    private readonly equipementCompanyService: EquipementCompanyService,
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
    type: [EquipementCompany],
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
    type: EquipementCompany,
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
}
