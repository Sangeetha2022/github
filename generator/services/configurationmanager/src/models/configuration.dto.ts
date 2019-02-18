import { IsString, IsArray } from 'class-validator';

class GpConfigDto {
  @IsString()
  public name: string

  @IsString()
  public label: string

  @IsString()
  public description: string

  @IsString()
  public value: string

  @IsString()
  public type: string

  @IsString()
  public sub_type: string
}

export default GpConfigDto;
