import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    if (this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()])) return true;
    const req = context.switchToHttp().getRequest(); const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Sessão não encontrada.');
    try { req.user = await this.jwt.verifyAsync(token); return true; } catch { throw new UnauthorizedException('Sessão inválida ou expirada.'); }
  }
}
