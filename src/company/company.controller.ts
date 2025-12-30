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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from '../entities/entities/Company';

@ApiTags('Companies')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une entreprise' })
  @ApiResponse({ status: 201, description: 'Entreprise créée.', type: Company })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les entreprises' })
  @ApiResponse({
    status: 200,
    description: 'Liste des entreprises.',
    type: [Company],
  })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une entreprise par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({
    status: 200,
    description: 'Entreprise trouvée.',
    type: Company,
  })
  findOne(@Param('id') id: string) {
    return this.companyService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une entreprise' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({
    status: 200,
    description: 'Entreprise mise à jour.',
    type: Company,
  })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateById(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une entreprise' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({ status: 200, description: 'Entreprise supprimée.' })
  remove(@Param('id') id: string) {
    return this.companyService.removeById(+id);
  }
}
