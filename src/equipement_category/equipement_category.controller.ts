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
import { EquipementCategoryService } from './equipement_category.service';
import { CreateEquipementCategoryDto } from './dto/create-equipement_category.dto';
import { UpdateEquipementCategoryDto } from './dto/update-equipement_category.dto';
import { EquipementCategory } from '../entities/entities/EquipementCategory';

@ApiTags('Equipement categories')
@Controller('equipement-category')
export class EquipementCategoryController {
  constructor(
    private readonly equipementCategoryService: EquipementCategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une catégorie d’équipement' })
  @ApiResponse({
    status: 201,
    description: 'Catégorie créée.',
    type: EquipementCategory,
  })
  create(@Body() createEquipementCategoryDto: CreateEquipementCategoryDto) {
    return this.equipementCategoryService.create(createEquipementCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les catégories d’équipement' })
  @ApiResponse({
    status: 200,
    description: 'Liste des catégories.',
    type: [EquipementCategory],
  })
  findAll() {
    return this.equipementCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie par ID' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({
    status: 200,
    description: 'Catégorie trouvée.',
    type: EquipementCategory,
  })
  findOne(@Param('id') id: string) {
    return this.equipementCategoryService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({
    status: 200,
    description: 'Catégorie mise à jour.',
    type: EquipementCategory,
  })
  update(
    @Param('id') id: string,
    @Body() updateEquipementCategoryDto: UpdateEquipementCategoryDto,
  ) {
    return this.equipementCategoryService.updateById(
      +id,
      updateEquipementCategoryDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiParam({ name: 'id', description: 'ID de la catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie supprimée.' })
  remove(@Param('id') id: string) {
    return this.equipementCategoryService.removeById(+id);
  }
}
