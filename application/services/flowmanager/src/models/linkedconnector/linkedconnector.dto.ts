import { IsString, IsArray } from 'class-validator';

class LinkedConnectorDto {
  @IsString()
  public name: string

  @IsString()
  public url: string
  
  @IsString()
  public description: string
  @IsArray()
  public properties: Array<any>
}

export default LinkedConnectorDto;
