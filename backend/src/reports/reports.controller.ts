import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/admin.guard';
import { PrismaService } from '../prisma/prisma.service';
@UseGuards(AdminGuard)
@Controller('reports')
export class ReportsController {
  constructor(private prisma: PrismaService) {}
  @Get('overview') async overview(@Query('cityId') cityId?:string,@Query('neighborhoodId') neighborhoodId?:string,@Query('from') from?:string,@Query('to') to?:string){
    const blockWhere:any={}; if(neighborhoodId)blockWhere.neighborhoodId=neighborhoodId; else if(cityId)blockWhere.neighborhood={cityId};
    const completedWhere:any={status:'COMPLETED',...blockWhere}; if(from||to)completedWhere.completedAt={...(from?{gte:new Date(`${from}T00:00:00`)}:{}),...(to?{lte:new Date(`${to}T23:59:59`)}:{})};
    const [total,completed,byCity,byUser,recent]=await Promise.all([
      this.prisma.block.count({where:blockWhere}),this.prisma.block.count({where:completedWhere}),
      this.prisma.city.findMany({where:cityId?{id:cityId}:undefined,orderBy:{name:'asc'},include:{neighborhoods:{include:{blocks:{select:{status:true}}}}}}),
      this.prisma.user.findMany({where:{completedBlocks:{some:completedWhere}},select:{id:true,name:true,_count:{select:{completedBlocks:{where:completedWhere}}}},orderBy:{name:'asc'}}),
      this.prisma.block.findMany({where:completedWhere,take:100,orderBy:{completedAt:'desc'},include:{completedBy:{select:{name:true}},neighborhood:{include:{city:true}}}})
    ]);
    const cities=byCity.map(c=>{const blocks=c.neighborhoods.flatMap(n=>n.blocks);const done=blocks.filter(b=>b.status==='COMPLETED').length;return {id:c.id,name:c.name,total:blocks.length,completed:done,percentage:blocks.length?Math.round(done/blocks.length*100):0};}).filter(c=>c.total>0);
    return {total,completed,pending:total-completed,percentage:total?Math.round(completed/total*100):0,cities,users:byUser.map(u=>({id:u.id,name:u.name,completed:u._count.completedBlocks})),recent};
  }
}
