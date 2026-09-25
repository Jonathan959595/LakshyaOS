import { IsEmail, IsInt, IsOptional, IsString, Length, Max, Min, Matches } from 'class-validator';

export class SignupDto {
  @IsString() @Length(2, 100) name!: string;
  @IsEmail() email!: string;
  @IsString() @Length(10, 128) password!: string;
  @IsOptional() @Matches(/^\+?[0-9]{7,15}$/) phone?: string;
  @IsOptional() @IsString() @Length(1, 64) college?: string;
  @IsOptional() @IsString() @Length(1, 64) studentId?: string;
  @IsOptional() @IsString() @Length(1, 100) departmentName?: string;
  @IsOptional() @IsInt() @Min(1) @Max(8) year?: number;
}
