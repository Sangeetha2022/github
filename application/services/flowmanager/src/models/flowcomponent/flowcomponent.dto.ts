import { IsString } from 'class-validator';

class FlowCompDto {
  @IsString()
  public name: string

  @IsString()
  public label: string

  @IsString()
  public type: string

  @IsString()
  public sequence_id: string

  @IsString()
  public dev_language: string

  @IsString()
  public dev_framework: string

  @IsString()
  public description: string
}

export default FlowCompDto;
