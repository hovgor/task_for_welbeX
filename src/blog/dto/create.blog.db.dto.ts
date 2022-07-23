import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlodDbDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  attachment?: any[];
}
