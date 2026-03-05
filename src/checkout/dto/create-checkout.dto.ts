import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export enum CheckoutItemType {
  DOMAIN = 'domain',
  EQUIPMENT = 'equipment',
}

export class CheckoutItemDto {
  @ApiProperty({ enum: CheckoutItemType })
  @IsEnum(CheckoutItemType)
  type: CheckoutItemType;

  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  quantity?: string;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;
}

export class CheckoutAddressDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  streetName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateCheckoutDto {
  @ApiProperty({ type: [CheckoutItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];

  @ApiProperty()
  @IsNumber()
  cartTotal: number;

  @ApiProperty({ type: CheckoutAddressDto })
  @ValidateNested()
  @Type(() => CheckoutAddressDto)
  address: CheckoutAddressDto;
}
