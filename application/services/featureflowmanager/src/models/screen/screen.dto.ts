import { IsOptional, IsString, ValidateNested, IsNumber } from 'class-validator';

class ScreenDto {
  @IsString()
  public screenName: string;

  @IsString()
  public description: string;

}

export default ScreenDto;
