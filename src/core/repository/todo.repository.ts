import { Repository } from "typeorm";
import { TodoEntity } from "../entity/todo.entity";

export type TodoRepository = Repository<TodoEntity>;
