import { PartialType } from '@nestjs/swagger';
import { CreateUserInformationDto } from './create-user_information.dto';

export class UpdateUserInformationDto extends PartialType(
  CreateUserInformationDto,
) {}
