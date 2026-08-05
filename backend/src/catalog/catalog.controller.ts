import { Controller, Get } from '@nestjs/common'; import { PrismaService } from '../prisma/prisma.service';
@Controller() export class CatalogController { constructor(private prisma: PrismaService) {} @Get('cities') cities(){return this.prisma.city.findMany({orderBy:{name:'asc'},include:{neighborhoods:{orderBy:{name:'asc'},include:{_count:{select:{blocks:true}}}}}});} }
