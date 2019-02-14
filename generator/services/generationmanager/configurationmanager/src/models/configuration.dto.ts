import { IsString, IsArray } from 'class-validator';

class GenFlowDto {
  @IsString()
  public flow_name: string

  @IsArray()
  public flow_comp_seq: any
}

export default GenFlowDto;
