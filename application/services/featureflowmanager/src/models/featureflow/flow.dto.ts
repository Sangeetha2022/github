import { IsOptional, IsString, ValidateNested, IsNumber } from 'class-validator';

class FlowDto {
  @IsString()
  public name: string;

  @IsString()
  public label: string;

  @IsString()
  public screenName: string;

  @IsString()
  public description: string;

  @IsString()
  public featureName: string;

  @IsString()
  public action_on_data: string;

  @IsString()
  public type: string;

  @IsNumber()
  public create_with_default_activity: number;

}

export default FlowDto;
