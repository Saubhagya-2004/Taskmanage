import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(req: any, body: {
        title: string;
        description?: string;
    }): Promise<import("../schemas/task.schema").Task>;
    findAll(req: any): Promise<import("../schemas/task.schema").Task[]>;
    updateStatus(req: any, id: string, status: string): Promise<import("../schemas/task.schema").Task>;
}
