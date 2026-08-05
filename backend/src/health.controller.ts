import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/auth.decorator';
@Controller('health')
export class HealthController { @Public() @Get() check(){ return { status:'ok', service:'quadracontrol-api' }; } }
