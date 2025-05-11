import { IsBoolean, IsEmail, IsString } from "class-validator";

class CreateUserDto {
    @IsString()
    name!: string;

    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsBoolean()
    is_admin!: boolean;
}

export default CreateUserDto;
