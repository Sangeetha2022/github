import { IsOptional, IsString, ValidateNested, IsNumber, IsDate } from 'class-validator';

class ProjectGenDto {
  @IsString()
  public poject_id: string;

  @IsString()
  public poject_name: string;

  @IsString()
  public user_id: string;

  @IsString()
  public user_name: string;

  @IsString()
  public status: string;

  @IsString()
  public status_message: string;
  
  @IsString()
  public stack_trace: string;

  @IsString()
  public claimed: string;

  @IsDate()
  public created_at: Date;

  @IsDate()
  public updated_at: Date;

  @IsString()
  public parent_gen_id: string;

}

export default ProjectGenDto;