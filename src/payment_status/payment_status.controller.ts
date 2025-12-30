import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PaymentStatus } from '../entities/entities/PaymentStatus';

@ApiTags('Payment status')
@Controller('payment-status')
export class PaymentStatusController {
  constructor(private readonly paymentStatusService: PaymentStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un statut de paiement' })
  @ApiResponse({
    status: 201,
    description: 'Statut de paiement créé',
    type: PaymentStatus,
  })
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusService.create(createPaymentStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les statuts de paiement' })
  @ApiResponse({
    status: 200,
    description: 'Liste des statuts',
    type: [PaymentStatus],
  })
  findAll() {
    return this.paymentStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un statut de paiement par ID' })
  @ApiParam({ name: 'id', description: 'ID du statut de paiement' })
  @ApiResponse({
    status: 200,
    description: 'Statut trouvé',
    type: PaymentStatus,
  })
  findOne(@Param('id') id: string) {
    return this.paymentStatusService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un statut de paiement' })
  @ApiParam({ name: 'id', description: 'ID du statut de paiement' })
  @ApiResponse({
    status: 200,
    description: 'Statut mis à jour',
    type: PaymentStatus,
  })
  update(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentStatusService.updateById(+id, updatePaymentStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut de paiement' })
  @ApiParam({ name: 'id', description: 'ID du statut de paiement' })
  @ApiResponse({ status: 200, description: 'Statut supprimé' })
  remove(@Param('id') id: string) {
    return this.paymentStatusService.removeById(+id);
  }
}
