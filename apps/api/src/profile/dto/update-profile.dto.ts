import { IsInt, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator';
export class UpdateProfileDto {
  @IsOptional() @IsString() @Length(2, 100) name?: string;
  @IsOptional() @Matches(/^\+?[0-9]{7,15}$/) phone?: string;
  @IsOptional() @IsString() @Length(1, 64) college?: string;
  @IsOptional() @IsString() @Length(1, 64) studentId?: string;
  @IsOptional() @IsString() @Length(1, 100) departmentName?: string;
  @IsOptional() @IsInt() @Min(1) @Max(8) year?: number;
}
