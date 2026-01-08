import { PartialType } from '@nestjs/swagger';
import { CreateUserInformationsDto } from './create-user_informations.dto';

export class UpdateUserInformationsDto extends PartialType(
  CreateUserInformationsDto,
) {}
