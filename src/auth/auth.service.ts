import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/entities/Users';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    access_token: string;
    user: {
      login: string;
      email: string;
      isAdmin: boolean | null;
      isSuperAdmin: boolean | null;
    };
  }> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: registerDto.email }, { login: registerDto.login }],
    });

    if (existingUser) {
      throw new ConflictException('Email ou login déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      login: registerDto.login,
      email: registerDto.email,
      password: hashedPassword,
      isAdmin: false,
      isSuperAdmin: false,
    });

    await this.userRepository.save(user);
    const token = this.generateToken(user);
    return {
      access_token: token,
      user: {
        login: user.login,
        email: user.email,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const token = this.generateToken(user);

    return {
      access_token: token,
      user: {
        login: user.login,
        email: user.email,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
      },
    };
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.userId,
      email: user.email,
      login: user.login,
      isAdmin: user.isAdmin || false,
      isSuperAdmin: user.isSuperAdmin || false,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userId } });
  }
}
