import { PartialType } from '@nestjs/swagger';
import { CreateCompanyPayoutDto } from './create-company_payout.dto';

export class UpdateCompanyPayoutDto extends PartialType(CreateCompanyPayoutDto) {}
