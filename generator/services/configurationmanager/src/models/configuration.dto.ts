import { IsString, IsArray, IsDate } from 'class-validator';

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

  @IsDate()
  public created_at: Date;

  @IsDate()
  public updated_at: Date;

  
}

export default GpConfigDto;
