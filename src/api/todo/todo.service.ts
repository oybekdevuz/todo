import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../infrastructure/lib/baseService';
import { TodoEntity } from '../../core/entity/todo.entity';
import { TodoRepository } from '../../core/repository';
import { responseByLang } from '../../infrastructure/lib/prompts/successResponsePrompt';

@Injectable()
export class TodoService extends BaseService<CreateTodoDto, UpdateTodoDto, TodoEntity> {
    constructor(
        @InjectRepository(TodoEntity) private readonly todoRepo: TodoRepository,
    ) {
        super(todoRepo, "todo");
    }

    public async createNews(dto: CreateTodoDto) {
        const todo = new TodoEntity();
        todo.name = dto.name;
        todo.color = dto.color;
        todo.status = dto.status;

        await this.todoRepo.save(todo);
        const message = responseByLang("create", 'en');

        return {
            status_code: 201,
            message,
            data: [],
        };
    }


    async updateNews(id: number, dto: UpdateTodoDto) {
        const { data: found_todo } = await this.findOneById(id, 'en', {
            where: { is_deleted: false },
        });


        found_todo.name = dto.name || found_todo.name;
        found_todo.color = dto.color || found_todo.color;
        found_todo.status = dto.status || found_todo.status;

        await this.todoRepo.save(found_todo);

        const message = responseByLang("update", 'en');
        return {
            status_code: 200,
            message,
            data: [],
        };
    }

    async remove(id: number,) {
        const { data: found_todo } = await this.findOneById(id, 'en', {
            where: { is_deleted: false },
        });

        if (found_todo) {
            await this.delete(id, 'en');
        }
        const message = responseByLang("delete", 'en');
        return { status_code: 200, message, data: [] };
    }
}
