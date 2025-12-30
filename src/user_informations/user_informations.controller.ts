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
import { UserInformationsService } from './user_informations.service';
import { CreateUserInformationDto } from './dto/create-user_information.dto';
import { UpdateUserInformationDto } from './dto/update-user_information.dto';
import { UserInformations } from '../entities/entities/UserInformations';

@ApiTags('User informations')
@Controller('user-informations')
export class UserInformationsController {
  constructor(
    private readonly userInformationsService: UserInformationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une information utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Information utilisateur créée.',
    type: UserInformations,
  })
  create(@Body() createUserInformationDto: CreateUserInformationDto) {
    return this.userInformationsService.create(createUserInformationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les informations utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des informations utilisateurs.',
    type: [UserInformations],
  })
  findAll() {
    return this.userInformationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une information utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’information utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Information utilisateur trouvée.',
    type: UserInformations,
  })
  findOne(@Param('id') id: string) {
    return this.userInformationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une information utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l’information utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Information utilisateur mise à jour.',
    type: UserInformations,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserInformationDto: UpdateUserInformationDto,
  ) {
    return this.userInformationsService.update(+id, updateUserInformationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une information utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l’information utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Information utilisateur supprimée.',
  })
  remove(@Param('id') id: string) {
    return this.userInformationsService.remove(+id);
  }
}
