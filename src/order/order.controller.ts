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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../entities/entities/Orders';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande' })
  @ApiResponse({ status: 201, description: 'Commande créée.', type: Order })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les commandes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des commandes.',
    type: [Order],
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée.', type: Order })
  findOne(@Param('id') id: string) {
    return this.orderService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({
    status: 200,
    description: 'Commande mise à jour.',
    type: Order,
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateById(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande supprimée.' })
  remove(@Param('id') id: string) {
    return this.orderService.removeById(+id);
  }
}
