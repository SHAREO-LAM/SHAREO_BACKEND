import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Login de l’utilisateur' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Email de l’utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mot de passe de l’utilisateur' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Est admin ?', required: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiProperty({ description: 'Est super admin ?', required: false })
  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean;

  @ApiProperty({ description: 'Date de création', required: false })
  @IsOptional()
  @IsString()
  datetimeCreate?: string;

  @ApiProperty({ description: 'Date de mise à jour', required: false })
  @IsOptional()
  @IsString()
  datetimeUpdate?: string;

  @ApiProperty({ description: 'ID de l’utilisateur créateur', required: false })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur modificateur',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}
