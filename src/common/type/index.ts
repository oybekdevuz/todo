import { IsNotEmpty, IsNumber } from "class-validator";
import { Roles } from "../database/Enums";

export class ObjDto {
	@IsNotEmpty()
	@IsNumber()
	id!: number;
}

export interface IResponse<T> {
	status_code: number;
	data: T;
	message: string;
}

export interface AuthPayload {
	id: number;
	role: Roles;
	email: string
}
