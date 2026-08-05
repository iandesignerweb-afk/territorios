import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
class LoginDto { @IsString() username!: string; @IsString() @MinLength(6) password!: string; }
@Controller('auth') export class AuthController { constructor(private auth: AuthService) {} @Post('login') login(@Body(new ValidationPipe({ whitelist: true })) dto: LoginDto) { return this.auth.login(dto.username, dto.password); } @Post('logout') logout(@Req() req:{user:{sub:string}}){return this.auth.logout(req.user.sub);} }
