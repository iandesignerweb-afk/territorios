import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest().user;
    if (user?.role !== 'ADMIN') throw new ForbiddenException('Apenas administradores podem acessar este recurso.');
    return true;
  }
}
