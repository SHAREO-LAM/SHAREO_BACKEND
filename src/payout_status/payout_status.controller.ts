import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayoutStatusService } from './payout_status.service';
import { CreatePayoutStatusDto } from './dto/create-payout_status.dto';
import { UpdatePayoutStatusDto } from './dto/update-payout_status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PayoutStatus } from '../entities/entities/PayoutStatus';

@ApiTags('Payout status')
@Controller('payout-status')
export class PayoutStatusController {
  constructor(private readonly payoutStatusService: PayoutStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un statut de paiement à verser' })
  @ApiResponse({
    status: 201,
    description: 'Statut créé avec succès',
    type: PayoutStatus,
  })
  create(@Body() createPayoutStatusDto: CreatePayoutStatusDto) {
    return this.payoutStatusService.create(createPayoutStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les statuts de paiement à verser' })
  @ApiResponse({
    status: 200,
    description: 'Liste des statuts renvoyée',
    type: [PayoutStatus],
  })
  findAll() {
    return this.payoutStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un statut par ID' })
  @ApiParam({ name: 'id', description: 'ID du statut à récupérer' })
  @ApiResponse({
    status: 200,
    description: 'Statut trouvé',
    type: PayoutStatus,
  })
  findOne(@Param('id') id: string) {
    return this.payoutStatusService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un statut par ID' })
  @ApiParam({ name: 'id', description: 'ID du statut à mettre à jour' })
  @ApiResponse({
    status: 200,
    description: 'Statut mis à jour avec succès',
    type: PayoutStatus,
  })
  update(
    @Param('id') id: string,
    @Body() updatePayoutStatusDto: UpdatePayoutStatusDto,
  ) {
    return this.payoutStatusService.updateById(+id, updatePayoutStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut par ID' })
  @ApiParam({ name: 'id', description: 'ID du statut à supprimer' })
  @ApiResponse({ status: 200, description: 'Statut supprimé avec succès' })
  remove(@Param('id') id: string) {
    return this.payoutStatusService.removeById(+id);
  }
}
