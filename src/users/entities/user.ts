import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: "Identifiant unique de l'utilisateur",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: "Adresse e-mail de l'utilisateur",
    example: 'john.doe@example.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: "Statut d'activation de l'utilisateur",
    default: true,
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;
}
