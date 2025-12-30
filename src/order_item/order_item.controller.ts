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
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem } from '../entities/entities/OrderItem';

@ApiTags('Order item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un élément de commande' })
  @ApiResponse({ status: 201, description: 'Élément créé.', type: OrderItem })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les éléments de commande' })
  @ApiResponse({
    status: 200,
    description: 'Liste des éléments.',
    type: [OrderItem],
  })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un élément de commande par ID' })
  @ApiParam({ name: 'id', description: "ID de l'élément de commande" })
  @ApiResponse({ status: 200, description: 'Élément trouvé.', type: OrderItem })
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un élément de commande' })
  @ApiParam({ name: 'id', description: "ID de l'élément de commande" })
  @ApiResponse({
    status: 200,
    description: 'Élément mis à jour.',
    type: OrderItem,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.updateById(+id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un élément de commande' })
  @ApiParam({ name: 'id', description: "ID de l'élément de commande" })
  @ApiResponse({ status: 200, description: 'Élément supprimé.' })
  remove(@Param('id') id: string) {
    return this.orderItemService.removeById(+id);
  }
}
