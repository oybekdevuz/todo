import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

    @ApiProperty({
        description: 'The name of the todo item',
        example: 'Buy groceries',
    })
    @IsNotEmpty()
    @IsString()
    public name!: string;
    
    @ApiProperty({
        description: 'The color associated with the todo item',
        example: '#ff0000',
    })
    @IsNotEmpty()
    @IsString()
    public color!: string;

    @ApiProperty({
        description: 'The status of the todo item',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    public status!: boolean;

}
