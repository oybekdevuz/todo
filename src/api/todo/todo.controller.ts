import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from '../../core/entity/todo.entity';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new todo item' })
    @ApiResponse({ status: 201, description: 'The todo item has been successfully created.', type: TodoEntity })
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.createNews(createTodoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve a list of all todo items' })
    @ApiResponse({ status: 200, description: 'A list of todo items.', type: [TodoEntity] })
    findAll() {
        return this.todoService.findAll('en', { where: { is_deleted: false } });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific todo item by ID' })
    @ApiResponse({ status: 200, description: 'The todo item.', type: TodoEntity })
    findOne(@Param('id') id: string) {
        return this.todoService.findOneById(+id, 'en', { where: { is_deleted: false } });
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing todo item' })
    @ApiResponse({ status: 200, description: 'The todo item has been successfully updated.', type: TodoEntity })
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.updateNews(+id, updateTodoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific todo item' })
    @ApiResponse({ status: 200, description: 'The todo item has been successfully deleted.' })
    remove(@Param('id') id: string) {
        return this.todoService.remove(+id);
    }
}
