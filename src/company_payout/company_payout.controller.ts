import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyPayoutService } from './company_payout.service';
import { CreateCompanyPayoutDto } from './dto/create-company_payout.dto';
import { UpdateCompanyPayoutDto } from './dto/update-company_payout.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompanyPayout } from '../entities/entities/CompanyPayout';

@ApiTags('Company Payout')
@Controller('company-payout')
export class CompanyPayoutController {
  constructor(private readonly companyPayoutService: CompanyPayoutService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un paiement pour une société' })
  @ApiResponse({
    status: 201,
    description: 'Paiement créé',
    type: CompanyPayout,
  })
  create(@Body() createCompanyPayoutDto: CreateCompanyPayoutDto) {
    return this.companyPayoutService.create(createCompanyPayoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les paiements de société' })
  @ApiResponse({
    status: 200,
    description: 'Liste des paiements',
    type: [CompanyPayout],
  })
  findAll() {
    return this.companyPayoutService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un paiement de société par ID' })
  @ApiParam({ name: 'id', description: 'ID du paiement' })
  @ApiResponse({
    status: 200,
    description: 'Paiement trouvé',
    type: CompanyPayout,
  })
  findOne(@Param('id') id: string) {
    return this.companyPayoutService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un paiement de société' })
  @ApiParam({ name: 'id', description: 'ID du paiement' })
  @ApiResponse({
    status: 200,
    description: 'Paiement mis à jour',
    type: CompanyPayout,
  })
  update(
    @Param('id') id: string,
    @Body() updateCompanyPayoutDto: UpdateCompanyPayoutDto,
  ) {
    return this.companyPayoutService.updateById(+id, updateCompanyPayoutDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un paiement de société' })
  @ApiParam({ name: 'id', description: 'ID du paiement' })
  @ApiResponse({ status: 200, description: 'Paiement supprimé' })
  remove(@Param('id') id: string) {
    return this.companyPayoutService.removeById(+id);
  }
}
