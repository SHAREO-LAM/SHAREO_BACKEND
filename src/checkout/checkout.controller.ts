// checkout.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new checkout order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiBody({ type: CreateCheckoutDto })
  async checkout(@Body() dto: CreateCheckoutDto) {
    return this.checkoutService.createCheckout(dto);
  }
}
