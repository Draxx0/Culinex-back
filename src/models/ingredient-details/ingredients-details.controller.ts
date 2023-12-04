import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { IngredientsDetailsService } from './ingredients-details.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role, Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('ingredients-details')
@UseGuards(AuthGuard, RolesGuard)
export class IngredientsDetailsController {
  constructor(
    private readonly ingredientsDetailsService: IngredientsDetailsService,
  ) {}

  @Get()
  async findAll() {
    return await this.ingredientsDetailsService.findAll();
  }

  @Delete(':id')
  @Roles([Role.ADMIN])
  async delete(@Param('id') id: string) {
    return await this.ingredientsDetailsService.delete(id);
  }

  @Delete()
  @Roles([Role.ADMIN])
  async deleteAll() {
    return await this.ingredientsDetailsService.deleteAll();
  }
}
