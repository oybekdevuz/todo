import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../../core/entity/todo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
