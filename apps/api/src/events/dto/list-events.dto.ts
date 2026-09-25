import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { EventCategory } from '@prisma/client';
export class ListEventsDto {
  @IsOptional() @IsEnum(EventCategory) category?: EventCategory;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @Transform(({ value }) => value === 'true') @IsBoolean() flagship?: boolean;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @Transform(({ value }) => value === 'true') @IsBoolean() upcoming?: boolean;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() @Min(1) page = 1;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsInt() @Min(1) @Max(50) limit = 20;
}
