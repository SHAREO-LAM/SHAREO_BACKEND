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
import { OrderStatusService } from './order_status.service';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { OrderStatus } from '../entities/entities/OrderStatus';

@ApiTags('Order status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un statut de commande' })
  @ApiResponse({ status: 201, description: 'Statut créé.', type: OrderStatus })
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les statuts de commande' })
  @ApiResponse({
    status: 200,
    description: 'Liste des statuts.',
    type: [OrderStatus],
  })
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un statut par ID' })
  @ApiParam({ name: 'id', description: 'ID du statut' })
  @ApiResponse({
    status: 200,
    description: 'Statut trouvé.',
    type: OrderStatus,
  })
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un statut de commande' })
  @ApiParam({ name: 'id', description: 'ID du statut' })
  @ApiResponse({
    status: 200,
    description: 'Statut mis à jour.',
    type: OrderStatus,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderStatusService.updateById(+id, updateOrderStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut de commande' })
  @ApiParam({ name: 'id', description: 'ID du statut' })
  @ApiResponse({ status: 200, description: 'Statut supprimé.' })
  remove(@Param('id') id: string) {
    return this.orderStatusService.removeById(+id);
  }
}
