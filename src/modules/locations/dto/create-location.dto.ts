import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  cep: string;

  @IsString()
  streetName: string;

  @IsString()
  addressNumber: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
