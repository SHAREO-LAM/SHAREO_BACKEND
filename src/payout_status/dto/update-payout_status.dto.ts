import { PartialType } from '@nestjs/swagger';
import { CreatePayoutStatusDto } from './create-payout_status.dto';

export class UpdatePayoutStatusDto extends PartialType(CreatePayoutStatusDto) {}
