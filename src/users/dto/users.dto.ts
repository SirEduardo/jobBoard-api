import { IsOptional, IsString } from "class-validator";


export class UpdateUsersDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    email?: string
}

