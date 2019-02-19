import { IsString, IsArray } from 'class-validator';

class ConnectorDto {
  @IsString()
  public name: string

  @IsString()
  public url: string
  
  @IsString()
  public description: string

  @IsArray()
  public properties: Array<any>
}

export default ConnectorDto;
