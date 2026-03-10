import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    create(userId: string, title: string, description?: string): Promise<Task>;
    findAll(userId: string): Promise<Task[]>;
    updateStatus(id: string, userId: string, status: string): Promise<Task>;
}
