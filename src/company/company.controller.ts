import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from '../entities/entities/Company';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une entreprise' })
  @ApiResponse({ status: 201, description: 'Entreprise créée.', type: Company })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les entreprises' })
  @ApiResponse({
    status: 200,
    description: 'Liste des entreprises.',
    type: [Company],
  })
  findAll() {
    return this.companyService.findAll();
  }

  @Get('validated')
  @ApiOperation({ summary: 'Lister les entreprises validees' })
  @ApiResponse({
    status: 200,
    description: 'Liste des entreprises validees.',
    type: [Company],
  })
  findValidated() {
    return this.companyService.findValidated();
  }

  @Get('pending-validation')
  @ApiOperation({ summary: 'Lister les entreprises en attente de validation' })
  @ApiResponse({
    status: 200,
    description: 'Liste des entreprises en attente.',
    type: [Company],
  })
  findPendingValidation() {
    return this.companyService.findPendingValidation();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une entreprise par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({
    status: 200,
    description: 'Entreprise trouvée.',
    type: Company,
  })
  findOne(@Param('id') id: string) {
    return this.companyService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une entreprise' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({
    status: 200,
    description: 'Entreprise mise à jour.',
    type: Company,
  })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateById(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une entreprise' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({ status: 200, description: 'Entreprise supprimée.' })
  remove(@Param('id') id: string) {
    return this.companyService.removeById(+id);
  }

  @Post(':id/logo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Uploader un logo entreprise sur S3' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Logo entreprise mis a jour.',
    type: Company,
  })
  uploadLogo(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /^image\// })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.companyService.uploadLogo(+id, file);
  }

  @Delete(':id/logo')
  @ApiOperation({ summary: 'Supprimer le logo entreprise (S3 + DB)' })
  @ApiParam({ name: 'id', description: 'ID de l’entreprise' })
  @ApiResponse({
    status: 200,
    description: 'Logo entreprise supprime.',
    type: Company,
  })
  removeLogo(@Param('id') id: string) {
    return this.companyService.removeLogo(+id);
  }
}
