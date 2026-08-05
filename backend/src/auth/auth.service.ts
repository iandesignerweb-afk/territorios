import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) throw new UnauthorizedException('Usuário ou senha inválidos.');
    const token = await this.jwt.signAsync({ sub: user.id, username: user.username, role: user.role });
    await this.prisma.auditLog.create({ data: { action: 'LOGIN', description: 'Login realizado', userId: user.id } });
    return { accessToken: token, user: { id: user.id, name: user.name, username: user.username, role: user.role } };
  }
  async logout(userId:string) { await this.prisma.auditLog.create({ data: { action: 'LOGOUT', description: 'Logout realizado', userId } }); return { success:true }; }
}
