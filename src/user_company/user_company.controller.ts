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
import { UserCompanyService } from './user_company.service';
import { CreateUserCompanyDto } from './dto/create-user_company.dto';
import { UpdateUserCompanyDto } from './dto/update-user_company.dto';
import { UserCompany } from '../entities/entities/UserCompany';

@ApiTags('User company')
@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une association utilisateur-entreprise' })
  @ApiResponse({
    status: 201,
    description: 'Association créée.',
    type: UserCompany,
  })
  create(@Body() createUserCompanyDto: CreateUserCompanyDto) {
    return this.userCompanyService.create(createUserCompanyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister toutes les associations utilisateur-entreprise',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des associations.',
    type: [UserCompany],
  })
  findAll() {
    return this.userCompanyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une association par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’association' })
  @ApiResponse({
    status: 200,
    description: 'Association trouvée.',
    type: UserCompany,
  })
  findOne(@Param('id') id: string) {
    return this.userCompanyService.findOneById(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer toutes les companies d’un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l’utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Liste des associations User-Company trouvées',
    type: [UserCompany],
  })
  async findByUserId(@Param('userId') userId: string) {
    return this.userCompanyService.findCompaniesByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une association' })
  @ApiParam({ name: 'id', description: 'ID de l’association' })
  @ApiResponse({
    status: 200,
    description: 'Association mise à jour.',
    type: UserCompany,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ) {
    return this.userCompanyService.updateById(+id, updateUserCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une association' })
  @ApiParam({ name: 'id', description: 'ID de l’association' })
  @ApiResponse({ status: 200, description: 'Association supprimée.' })
  remove(@Param('id') id: string) {
    return this.userCompanyService.removeById(+id);
  }
}
