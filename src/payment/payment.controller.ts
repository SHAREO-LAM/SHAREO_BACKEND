import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Payment } from '../entities/entities/Payment';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un paiement' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({
    status: 201,
    description: 'Paiement créé avec succès',
    type: Payment,
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les paiements' })
  @ApiResponse({
    status: 200,
    description: 'Liste des paiements',
    type: [Payment],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un paiement par ID' })
  @ApiParam({ name: 'id', description: 'ID du paiement' })
  @ApiResponse({ status: 200, description: 'Paiement trouvé', type: Payment })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un paiement' })
  @ApiParam({ name: 'id', description: 'ID du paiement à mettre à jour' })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({
    status: 200,
    description: 'Paiement mis à jour',
    type: Payment,
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.updateById(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un paiement' })
  @ApiParam({ name: 'id', description: 'ID du paiement à supprimer' })
  @ApiResponse({ status: 200, description: 'Paiement supprimé avec succès' })
  remove(@Param('id') id: string) {
    return this.paymentService.removeById(+id);
  }

  @Post(':id/confirm')
  @ApiOperation({
    summary: 'Confirmer un paiement',
    description:
      'Confirme le paiement, met à jour la commande associée et déclenche la création des payouts.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID du paiement à confirmer',
    example: 12,
  })
  @ApiResponse({
    status: 200,
    description: 'Paiement confirmé et payouts créés',
    schema: {
      example: {
        message: 'Payment confirmed successfully',
        paymentId: 12,
        orderId: 45,
        payoutsCreated: 2,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Paiement introuvable ou déjà confirmé',
  })
  async confirmPayment(@Param('id') id: string) {
    return this.paymentService.confirmPayment(id);
  }
}
