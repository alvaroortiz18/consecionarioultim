import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarsService } from '../services/cars.service';
import { CreateCarDto, UpdateCarDto, FilterCarDto } from '../dto/car.dto';
import { Auth, GetUser } from '../../../auth/decorators';
import { ValidRoles } from '../../../auth/interfaces';
import { User } from '../../../auth/entities/user.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getFindAll(@Query() params: FilterCarDto) {
    // Asignar valores por defecto si no se envían
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = params.offset && params.offset >= 0 ? params.offset : 0;
    const filterParams = { ...params, limit, offset };

    const rows = await this.carsService.findAll(filterParams);

    return { data: rows };
  }

  @Post()
  @Auth(ValidRoles.admin)
  async create(@Body() createCarDto: CreateCarDto, @GetUser() user: User) {
    const nuevo = await this.carsService.create(createCarDto, user);
    return {
      data: nuevo,
      message: 'Registro creado correctamente',
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const rows = await this.carsService.findOne(id);
    return { data: rows };
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: number,
    @Body() updateCarDto: UpdateCarDto,
    @GetUser() user: User,
  ) {
    const datos = await this.carsService.update(id, updateCarDto, user);
    return {
      data: datos,
      message: 'Registro actualizado correctamente',
    };
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: number) {
    const dato = await this.carsService.remove(id);
    return {
      data: dato,
      message: 'Registro eliminado correctamente',
    };
  }
}
