import { IsString } from 'class-validator';

class ConnectorDto {
  @IsString()
  public name: string

  @IsString()
  public url: string
  
  @IsString()
  public description: string
}

export default ConnectorDto;
