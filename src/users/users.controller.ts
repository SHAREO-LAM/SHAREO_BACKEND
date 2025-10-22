import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from './entities/user';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "L'utilisateur a été créé avec succès.",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès.',
    type: [User],
  })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur a été trouvé.",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur non trouvé.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Mettre à jour un utilisateur par son ID avec validation',
  })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur a été mis à jour avec succès.",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur non trouvé.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Mettre à jour un utilisateur par son ID sans validation',
  })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur a été mis à jour avec succès.",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur non trouvé.',
  })
  @Patch(':id/partial')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialEntity: Partial<User>,
  ): Promise<User> {
    return this.usersService.updatePartial(id, partialEntity);
  }

  @ApiOperation({ summary: 'Supprimer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: "ID de l'utilisateur", example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur a été supprimé avec succès.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur non trouvé.',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
