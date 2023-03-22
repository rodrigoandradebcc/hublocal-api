import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly website: string;

  @IsString()
  readonly cnpj: string;
}
