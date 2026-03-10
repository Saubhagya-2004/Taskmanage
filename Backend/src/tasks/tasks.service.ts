import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async create(userId: string, title: string, description?: string): Promise<Task> {
        const newTask = new this.taskModel({ userId, title, description });
        return newTask.save();
    }

    async findAll(userId: string): Promise<Task[]> {
        return this.taskModel.find({ userId: userId as any }).sort({ createdAt: -1 }).exec();
    }

    async updateStatus(id: string, userId: string, status: string): Promise<Task> {
        const task = await this.taskModel.findOneAndUpdate(
            { _id: id as any, userId: userId as any },
            { status },
            { new: true },
        ).exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task as any as Task;
    }
}
