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
import { EquipementTypeService } from './equipement_type.service';
import { CreateEquipementTypeDto } from './dto/create-equipement_type.dto';
import { UpdateEquipementTypeDto } from './dto/update-equipement_type.dto';
import { EquipementType } from '../entities/entities/EquipementType';

@ApiTags('Equipement types')
@Controller('equipement-type')
export class EquipementTypeController {
  constructor(private readonly equipementTypeService: EquipementTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un type d’équipement' })
  @ApiResponse({ status: 201, description: 'Type créé.', type: EquipementType })
  create(@Body() createEquipementTypeDto: CreateEquipementTypeDto) {
    return this.equipementTypeService.create(createEquipementTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les types d’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Liste des types.',
    type: [EquipementType],
  })
  findAll() {
    return this.equipementTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un type par ID' })
  @ApiParam({ name: 'id', description: 'ID du type d’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Type trouvé.',
    type: EquipementType,
  })
  findOne(@Param('id') id: string) {
    return this.equipementTypeService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un type d’équipement' })
  @ApiParam({ name: 'id', description: 'ID du type' })
  @ApiResponse({
    status: 200,
    description: 'Type mis à jour.',
    type: EquipementType,
  })
  update(
    @Param('id') id: string,
    @Body() updateEquipementTypeDto: UpdateEquipementTypeDto,
  ) {
    return this.equipementTypeService.updateById(+id, updateEquipementTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un type d’équipement' })
  @ApiParam({ name: 'id', description: 'ID du type' })
  @ApiResponse({ status: 200, description: 'Type supprimé.' })
  remove(@Param('id') id: string) {
    return this.equipementTypeService.removeById(+id);
  }
}
